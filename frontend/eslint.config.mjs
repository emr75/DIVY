import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // ✅ enable JSX parsing
        },
      },
    },
    plugins: { react, prettier },
    settings: {
      react: {
        version: "detect", // ✅ auto-detect React version
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      "react/display-name": "off", // still disable this (ESLint 9 conflict)
      "prettier/prettier": "error",
    },
  },
  eslintConfigPrettier,
]);
