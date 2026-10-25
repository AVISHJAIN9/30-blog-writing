@echo off
echo ========================================================
echo Starting Full-Stack Blog Platform...
echo ========================================================

start "Blog Backend (Port 3001)" cmd /k "cd /d \"%~dp0backend\" && npm start"
start "Blog Frontend (Port 5179)" cmd /k "cd /d \"%~dp0frontend\" && npm run dev"

echo.
echo Application is starting!
echo Backend API: http://localhost:3001
echo Frontend:    http://localhost:5179
echo.
pause
