import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main/main.ts',
      formats: ['cjs'],
      fileName: 'main',
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['electron', 'fs', 'path', 'os', 'crypto'],
    },
  },
});