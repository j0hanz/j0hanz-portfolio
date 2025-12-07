import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    target: 'esnext',
    sourcemap: true,
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
