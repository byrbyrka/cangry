# Cangry Vault - Setup Instructions

## Problem: Electron Installation is Corrupted

Your `node_modules/electron/dist/resources/default_app.asar` file is locked by a running process. This prevents npm from reinstalling electron properly.

## Solution: Step-by-Step Fix

### Step 1: Restart Your Computer
This is the most reliable way to release the locked file.

### Step 2: After Restart, Open Command Prompt as Administrator
```cmd
cd /d D:\cangry
```

### Step 3: Remove Corrupted Electron
```cmd
rmdir /s /q node_modules\electron
```

### Step 4: Clear npm Cache
```cmd
npm cache clean --force
```

### Step 5: Reinstall Electron
```cmd
npm install electron@28.3.3 --save-dev
```

### Step 6: Build the Project
```cmd
npm run build:main
```

### Step 7: Run the Application
```cmd
npm run dev
```

## Alternative: Manual Electron Download

If npm install continues to fail:

1. Download Electron v28.3.3 for Windows:
   https://github.com/electron/electron/releases/download/v28.3.3/electron-v28.3.3-win32-x64.zip

2. Extract the ZIP file to: `D:\cangry\node_modules\electron\`
   - The `electron.exe` should be at: `D:\cangry\node_modules\electron\electron.exe`
   - The `resources` folder should be at: `D:\cangry\node_modules\electron\resources\`

3. Run the app:
   ```cmd
   npm run dev
   ```

## Native Module Build (Optional)

The C++ native module requires ClangCL which is not installed. The application uses JavaScript fallbacks instead, so this is optional.

To build the native module, you need:
1. Install LLVM/Clang from https://llvm.org/
2. Add Clang to Visual Studio: Open Visual Studio Installer → Modify → Individual Components → C++ Clang Compiler
3. Run: `npm run build:native`

## Project Structure

```
D:\cangry\
├── src/
│   ├── main/           # Electron main process
│   │   ├── main.ts     # Main entry point
│   │   ├── preload.ts  # Preload script
│   │   ├── clone.ts    # Vault cloning
│   │   ├── plugins.ts  # Plugin system
│   │   └── native.ts   # Native module wrapper
│   ├── renderer/       # React renderer process
│   │   ├── components/ # UI components
│   │   └── styles/     # CSS styles
│   └── native/         # C++ native module
├── dist/               # Built JavaScript files
├── package.json
└── README.md
```

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run build:main` | Build TypeScript main process |
| `npm run build:renderer` | Build React renderer with Vite |
| `npm run dev` | Run in development mode |
| `npm run build:native` | Build C++ native module (optional) |
| `npm run make` | Build production installer |