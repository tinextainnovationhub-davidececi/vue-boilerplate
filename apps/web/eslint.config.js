import vue from "@boilerplate/eslint-config/vue";

export default [
  ...vue,
  {
    // A feature is only reachable through its barrel: `@/features/<name>`, never via internal paths.
    files: ["src/**/*.{ts,vue}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*/*"],
              message: "Import from '@/features/<name>' (barrel), not from internal paths.",
            },
          ],
        },
      ],
    },
  },
  {
    // Environment variables are read only through the validated `@/config/env` module.
    files: ["src/**/*.{ts,vue}"],
    ignores: ["src/config/env.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "MetaProperty[meta.name='import'][property.name='meta']",
          message:
            "Do not read import.meta directly: import the validated envs from '@/config/env'.",
        },
      ],
    },
  },
  {
    files: ["src/**/*.vue"],
    rules: { "vue/no-bare-strings-in-template": "error" },
  },
];
