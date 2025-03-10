import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", 
    setupFiles: "./setupTests.ts",
    exclude: [...configDefaults.exclude, "node_modules/**"],
  },
  build: {
    minify: mode === 'production',
    rollupOptions: {
      output: {
        manualChunks: mode === 'development' ? undefined : {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
}))