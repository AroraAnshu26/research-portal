# Holds an idle-sleep wakelock until a given local time, then releases and exits.
#
# Why this exists: the Claude app's own keep-awake releases about five minutes
# after the session goes idle, which is no use for a 03:06 scheduled run. This
# asserts the same OS-level wakelock the app uses (SetThreadExecutionState with
# ES_CONTINUOUS | ES_SYSTEM_REQUIRED) and holds it until the time you give it.
#
# It changes NO system settings. Nothing to undo: the lock dies with the
# process, whether that is the timer expiring, a reboot, or you killing it.
#
#   powershell -ExecutionPolicy Bypass -File tools\keep-awake.ps1 -Until "03:45"
#   powershell -ExecutionPolicy Bypass -File tools\keep-awake.ps1 -Until "2026-09-17 03:45"
#
# To release early:  Get-Process powershell | Where-Object { $_.MainWindowTitle -eq 'claude-keep-awake' } | Stop-Process
# Or just close the window if you started it visibly.
#
# LIMITATION, and it is the same one the app has: this prevents IDLE sleep only.
# Closing the lid or choosing Sleep from the menu still sleeps the machine.

param(
  [Parameter(Mandatory = $true)][string]$Until,
  [int]$MaxHours = 14
)

$host.UI.RawUI.WindowTitle = 'claude-keep-awake'

# Parse in try/catch rather than TryParse: in Windows PowerShell 5.1 the
# [ref] overload of DateTime.TryParse does not resolve from an untyped variable.
try {
  [datetime]$target = [datetime]::Parse($Until)
} catch {
  Write-Host "Could not parse -Until '$Until'. Use HH:mm or 'yyyy-MM-dd HH:mm'."
  exit 1
}
# A bare time that has already passed today means the next occurrence.
if ($target -le (Get-Date)) { $target = $target.AddDays(1) }

$span = $target - (Get-Date)
if ($span.TotalHours -gt $MaxHours) {
  Write-Host ("Refusing to hold for {0:N1} h; the cap is {1} h. Pass -MaxHours to override." -f $span.TotalHours, $MaxHours)
  exit 1
}

Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public static class ClaudeKeepAwake {
  [DllImport("kernel32.dll", SetLastError = true)]
  public static extern uint SetThreadExecutionState(uint esFlags);
}
'@

# The L suffix matters: PowerShell reads a bare 0x80000000 as Int32, which
# overflows to -2147483648 and then fails the uint32 cast.
$ES_CONTINUOUS       = [uint32]0x80000000L
$ES_SYSTEM_REQUIRED  = [uint32]0x00000001L

$prev = [ClaudeKeepAwake]::SetThreadExecutionState($ES_CONTINUOUS -bor $ES_SYSTEM_REQUIRED)
if ($prev -eq 0) {
  Write-Host "SetThreadExecutionState failed; no lock is held."
  exit 1
}

Write-Host ""
Write-Host "  Holding off idle sleep until $($target.ToString('yyyy-MM-dd HH:mm')) local."
Write-Host ("  That is {0:N1} hours. Releasing automatically after that." -f $span.TotalHours)
Write-Host "  Close this window to release early. No settings were changed."
Write-Host ""

try {
  while ((Get-Date) -lt $target) {
    Start-Sleep -Seconds 30
  }
} finally {
  # Runs on normal exit, Ctrl+C, and window close: always drop the lock.
  [void][ClaudeKeepAwake]::SetThreadExecutionState($ES_CONTINUOUS)
  Write-Host "  Released at $((Get-Date).ToString('HH:mm:ss'))."
}
