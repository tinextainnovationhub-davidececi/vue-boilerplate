import prettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

import base from "./base.js";

export default tseslint.config(
  ...base,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    languageOptions: { globals: { ...globals.browser } },
    rules: {
      "vue/block-lang": ["error", { script: { lang: "ts" } }],
      "vue/component-api-style": ["error", ["script-setup"]],
      "vue/define-props-declaration": ["error", "type-based"],
      "vue/define-emits-declaration": ["error", "type-based"],
      // Formatting is delegated to Prettier.
      "vue/html-self-closing": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
  },
  {
    // Stories and tests use single-word component names.
    files: ["**/*.stories.ts", "**/*.test.ts"],
    rules: { "vue/one-component-per-file": "off" },
  },
  // Must stay last: disables formatting rules that conflict with Prettier.
  prettier,
);
