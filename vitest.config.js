import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use jsdom environment to simulate browser environment
    environment: 'jsdom',
    
    // Global setup and teardown
    globals: true,
    
    // Test files pattern
    include: ['src/test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    
    // Setup files to run before each test
    setupFiles: ['./src/test/setup.js'],
    
    // Coverage configuration
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.config.js',
        '**/*.test.js',
        '**/*.spec.js'
      ]
    },
    
    // Mock browser APIs
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname
    }
  }
});