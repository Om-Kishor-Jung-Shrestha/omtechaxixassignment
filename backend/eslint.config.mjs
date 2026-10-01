// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import { defineConfig } from "eslint/config";

// export default defineConfig(
//   {
//     ignores: ["dist", "node_modules"],
//   },

//   js.configs.recommended,

//   ...tseslint.configs.recommended,

//   {
//     files: ["**/*.ts"],
//     languageOptions: {
//       globals: {
//         ...globals.node,
//       },
//     },
//   }
// );



import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: ["dist", "node_modules"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  {
    files: ["src/middleware/response.middleware.ts"],

    rules: {
      "@typescript-eslint/no-namespace": "off",
    },
  },
);
