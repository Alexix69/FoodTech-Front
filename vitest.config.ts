import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',

    exclude: [
      'tests/e2e/**',
      'node_modules/**'
    ],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 80,
      statements: 80,
      branches: 75,
      functions: 80,
      exclude: [
        'node_modules/',
        'src/test/',
        'tests/e2e/',
        '**/*.config.*',
        '**/*.d.ts',
        '**/index.ts',
      ],
    },
  },
})