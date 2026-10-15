@echo off
title CyberShield Dashboard Launcher

echo Starting CyberShield Dashboard...

start "CyberShield Backend" cmd /k "cd /d C:\Users\sumit\OneDrive\Desktop\cyber\backend && npm start"

timeout /t 3 /nobreak >nul

start "CyberShield Frontened" cmd /k "cd /d C:\Users\sumit\OneDrive\Desktop\cyber\frontened && npm start"

echo.
echo Both startup commands have been launched.
pause