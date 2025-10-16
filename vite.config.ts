import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/be-interop/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
