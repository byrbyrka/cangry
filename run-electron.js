#!/usr/bin/env node
/**
 * Run script for Cangry Vault
 * Uses D:\electron-new\electron.exe with proper environment setup
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Use the working electron copy
const electronExe = 'D:\\electron-new\\electron.exe';

if (!fs.existsSync(electronExe)) {
  console.error('Error: Cannot find electron.exe at:', electronExe);
  process.exit(1);
}

console.log('Using electron:', electronExe);

// Set up environment
const appPath = path.join(__dirname);
const electronDir = path.dirname(electronExe);

// Build NODE_PATH with all necessary module paths
const nodePaths = [
  path.join(__dirname, 'node_modules'),
  path.join(electronDir, 'node_modules'),
].filter(p => fs.existsSync(p)).join(path.delimiter);

console.log('App path:', appPath);
console.log('NODE_PATH:', nodePaths);

const child = spawn(electronExe, ['.'], {
  stdio: 'inherit',
  cwd: appPath,
  env: {
    ...process.env,
    NODE_PATH: nodePaths,
    ELECTRON_RUN_AS_NODE: undefined,
    ELECTRON_ENABLE_LOGGING: '1',
  },
  windowsHide: false,
});

child.on('error', (err) => {
  console.error('Failed to start electron:', err.message);
  process.exit(1);
});

child.on('close', (code) => {
  console.log('Electron exited with code:', code);
  process.exit(code || 0);
});

process.on('SIGINT', () => {
  child.kill('SIGINT');
});

process.on('SIGTERM', () => {
  child.kill('SIGTERM');
});
