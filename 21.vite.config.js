const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  server: {
    cors: true, // This is simpler and allows any origin during development
    host: true,
    port: 5173, // Explicitly set the port
    strictPort: true, // Don't try alternative ports
    hmr: {
      clientPort: 5173 // Ensure client connects to same port
    }
  },
  build: {
    rollupOptions: {
      input: 'lib/small_joys_contact.js',
      output: {
        dir: 'dist/small_joys_contact',
        format: 'es',
        entryFileNames: '[name].js',
        esModule: false,
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  },
})