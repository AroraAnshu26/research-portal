@echo off
title Publish Portal
cd /d "%~dp0"
echo.
echo   Publishing to https://aroraanshu26.github.io/research-portal/
echo.
where node >nul 2>nul
if errorlevel 1 ( echo   Node.js not found on PATH. Cannot rebuild the snapshot. & pause & exit /b 1 )
node build-manifest.mjs
if errorlevel 1 ( echo   Snapshot build failed. Nothing published. & pause & exit /b 1 )
git add -A
git diff --cached --quiet
if not errorlevel 1 ( echo   Nothing has changed since the last publish. & pause & exit /b 0 )
for /f "tokens=1-3 delims=/ " %%a in ("%date%") do set STAMP=%%a %%b %%c
git commit -q -m "Portal update %STAMP%"
git push origin main
if errorlevel 1 ( echo. & echo   Push failed. & pause & exit /b 1 )
echo.
echo   Published. GitHub takes about a minute to rebuild the page.
echo.
pause
