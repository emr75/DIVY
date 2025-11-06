import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest, // ✅ add jest globals
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: { react, prettier },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...react.configs.recommended.rules,
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off", // ✅ React 17+ fix
      "react/no-unescaped-entities": "off", // ✅ optional
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "linebreak-style": "off", // avoid double enforcement
    },
  },
];
