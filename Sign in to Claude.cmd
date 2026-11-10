@echo off
title Sign in to Claude
echo.
echo   This signs the Claude command-line tool in to your Claude account,
echo   so the tutor inside portal reports can answer questions.
echo   A browser window will open. Finish signing in there, then come back.
echo.
claude auth login
echo.
claude auth status
echo.
echo   Done. You can close this window and ask the tutor again.
pause
