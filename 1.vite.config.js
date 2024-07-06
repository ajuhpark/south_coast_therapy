import path from 'path';
import { defineConfig } from 'vite';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

export default defineConfig({
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },

  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'lib/homepage.js'),
      output: {
        format: 'umd',
        entryFileNames: 'homepage.js',
        esModule: false,
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  }
});
