import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-react-compiler',
            {
              compilationMode: 'infer',
              panicThreshold: isDev ? 'critical_errors' : 'none',
              logger: isDev
                ? {
                    logEvent(
                      filename: string,
                      event: {
                        kind: string;
                        detail?: { reason?: string };
                      }
                    ) {
                      if (event.kind === 'CompileError') {
                        console.warn(`❌ React Compiler skipped: ${filename}`);
                        console.warn(
                          `   Reason: ${event.detail?.reason ?? 'Unknown'}`
                        );
                      }
                    },
                  }
                : undefined,
            },
          ],
        ],
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    target: 'esnext',
    sourcemap: isDev,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['motion'],
          mui: ['@mui/material', '@mui/system'],
          'mui-icons': ['@mui/icons-material'],
          query: ['@tanstack/react-query'],
          gsap: ['gsap', '@gsap/react'],
          aurora: ['ogl'],
        },
      },
    },
  },
});
