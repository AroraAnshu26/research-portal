@echo off
title Research Portal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo   Node.js was not found on PATH, so the portal cannot start its file store.
  echo   Opening the portal in browser-only mode instead - the board and reports
  echo   will read fine; the scratchpad will save inside the browser.
  echo.
  start "" "index.html"
  pause
  exit /b 0
)
node server.mjs
echo.
echo   Portal stopped.
pause
