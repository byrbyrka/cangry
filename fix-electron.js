const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const electronDir = path.join(__dirname, 'node_modules', 'electron');

// Try to delete the locked file first
const lockedFile = path.join(electronDir, 'dist', 'resources', 'default_app.asar');
if (fs.existsSync(lockedFile)) {
  try {
    fs.unlinkSync(lockedFile);
    console.log('Deleted locked file');
  } catch (e) {
    console.log('Could not delete locked file:', e.message);
  }
}

// Try to rename the directory
try {
  const oldDir = path.join(__dirname, 'node_modules', 'electron_old_' + Date.now());
  fs.renameSync(electronDir, oldDir);
  console.log('Renamed electron directory to:', oldDir);
} catch (e) {
  console.log('Could not rename electron directory:', e.message);
}

console.log('Done. Now try: npm install electron@28.3.3 --save-dev');