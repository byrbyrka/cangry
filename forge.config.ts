import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { VitePlugin } from '@electron-forge/plugin-vite';

const config: ForgeConfig = {
  packagerConfig: {
    name: 'Cangry Vault',
    executableName: 'cangry-vault',
    icon: './assets/icon',
    asar: true,
    extraResource: ['./build/Release'],
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      setupExe: 'cangry-vault-setup.exe',
    }),
    new MakerZIP({}, ['darwin']),
    new MakerDeb({
      options: {
        maintainer: 'Cangry Team',
        homepage: 'https://github.com/cangry/vault',
      },
    }),
    new MakerRpm({
      options: {
        maintainer: 'Cangry Team',
        homepage: 'https://github.com/cangry/vault',
      },
    }),
  ],
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: 'src/main/main.ts',
          config: 'vite.main.config.ts',
        },
        {
          entry: 'src/main/preload.ts',
          config: 'vite.preload.config.ts',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.config.ts',
        },
      ],
    }),
  ],
};

export default config;