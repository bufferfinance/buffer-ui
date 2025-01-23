import { lingui } from '@lingui/vite-plugin';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
const config = defineConfig(({ command, mode }) => {
  const isLocalDev = false;

  const env = loadEnv(mode, process.cwd(), '');
  return {
    // server: {
    //   hmr: false,
    // },
    // vite config
    optimizeDeps: {
      // 👈 optimizedeps
      esbuildOptions: {
        target: 'esnext',
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        supported: {
          bigint: true,
        },
      },
    },

    build: {
      target: ['esnext'], // 👈 build.target
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      react({
        babel: {
          plugins: ['macros'],
        },
      }),
      viteTsconfigPaths(),
      lingui(),
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: 'buffer',
        project: 'nextjs',
      }),
    ],

    define: {
      __APP_ENV__: env.APP_ENV,
      isDevnet: isLocalDev,
      api_url: JSON.stringify(
        isLocalDev
          ? 'http://localhost:4004/'
          : 'https://api-v2-production-cd16.up.railway.app/'
      ),
      indexer_url: JSON.stringify(
        isLocalDev
          ? 'http://localhost:42069/'
          : 'https://ponder-production-518e.up.railway.app/'
      ),
    },
  };
});

export default config;
