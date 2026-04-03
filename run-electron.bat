@echo off
REM Run Cangry Vault with Electron from electron-new directory
cd /d d:\electron-new

REM Set NODE_PATH to include cangry's node_modules
set NODE_PATH=d:\cangry\node_modules;d:\electron-temp-pkg\node_modules

REM Run electron with the cangry app
electron.exe d:\cangry