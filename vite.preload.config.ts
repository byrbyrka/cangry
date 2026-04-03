import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main/preload.ts',
      formats: ['cjs'],
      fileName: 'preload',
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['electron'],
    },
  },
});