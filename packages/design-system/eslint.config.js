import vue from "@boilerplate/eslint-config/vue";

export default [
  ...vue,
  {
    // Design system atoms have single-word names (Button, Input, ...).
    files: ["src/components/**/*.vue"],
    rules: { "vue/multi-word-component-names": "off" },
  },
];
