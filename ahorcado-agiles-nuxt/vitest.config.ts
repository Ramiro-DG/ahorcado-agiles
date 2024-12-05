import { defineVitestConfig } from "@nuxt/test-utils/config";
import { configDefaults } from "vitest/config";

export default defineVitestConfig({
  test: {
    environment: "happy-dom",
    dir: "components",
    coverage: {
      provider: "v8",
      exclude: [
        ...configDefaults.exclude,
        "./features/**",
        "./server/utils/**",
        "./cucumber.js",
        "./nuxt.config.ts",
        "./.nuxt/**",
        "./components/GameStartMenu.vue",
        "./pages/**",
      ],
    },
  },
});
