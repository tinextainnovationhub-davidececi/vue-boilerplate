import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

// Used by both Storybook and Vitest.
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: false,
    include: ["src/**/*.test.ts"],
  },
});
