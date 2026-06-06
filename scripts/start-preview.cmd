@echo off
chcp 65001 >nul
cd /d "%~dp0.."
echo [%date% %time%] cwd=%cd% > preview-start.log
echo [%date% %time%] starting npm run dev >> preview-start.log
npm run dev >> preview-start.log 2>&1
echo [%date% %time%] npm run dev exited with %errorlevel% >> preview-start.log
pause
