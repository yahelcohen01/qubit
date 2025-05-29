/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { default as tailwindcss } from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig(async () => {
  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/qubit',
    server: {
      port: 3000,
      host: 'localhost',
    },
    preview: {
      port: 4300,
      host: 'localhost',
    },
    plugins: [
      TanStackRouterVite({ autoCodeSplitting: true }),
      nxViteTsPaths(),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@ui': path.resolve(__dirname, '../../libs/ui/src'),
        '@utils': path.resolve(__dirname, '../../libs/utils/src'),
        '@types': path.resolve(__dirname, '../../libs/types/src'),
      },
    },
    build: {
      outDir: './dist',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
