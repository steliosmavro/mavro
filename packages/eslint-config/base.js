import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
        plugins: {
            turbo: turboPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            'turbo/no-undeclared-env-vars': 'warn',
            'prettier/prettier': 'error',
        },
    },
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            ...importPlugin.configs.recommended.rules,
            'import/no-relative-packages': 'error',
        },
        settings: {
            'import/resolver': {
                typescript: {}, // uses tsconfig.json automatically
            },
        },
    },
    {
        ignores: ['dist/**'],
    },
];
