@echo off
REM Fix Electron Installation Script
REM This script fixes the corrupted Electron installation

echo ========================================
echo Fixing Electron Installation
echo ========================================
echo.

REM Step 1: Kill any running electron processes
echo Step 1: Killing any running Electron processes...
taskkill /F /IM electron.exe /T 2>nul
timeout /t 2 /nobreak >nul

REM Step 2: Delete the locked electron folder
echo Step 2: Removing corrupted Electron installation...
rmdir /S /Q "D:\cangry\node_modules\electron" 2>nul
if exist "D:\cangry\node_modules\electron" (
    echo WARNING: Could not delete electron folder. It may still be locked.
    echo Please restart your computer and try again.
    pause
    exit /b 1
)

REM Step 3: Reinstall electron
echo Step 3: Reinstalling Electron...
cd /d D:\cangry
call npm install electron@28.3.3 --save-dev

if %errorlevel% neq 0 (
    echo.
    echo ERROR: npm install failed.
    echo.
    echo Alternative: Download Electron manually from:
    echo https://github.com/electron/electron/releases/download/v28.3.3/electron-v28.3.3-win32-x64.zip
    echo.
    echo Then extract to: D:\cangry\node_modules\electron\
    pause
    exit /b 1
)

echo.
echo ========================================
echo Electron installation fixed successfully!
echo ========================================
echo.
echo You can now run the app with: npm run dev
pause