import { config } from '@repo/eslint-config/react-internal';

export default [
    ...config,
    {
        languageOptions: {
            parserOptions: {
                project: true,
            },
        },
    },
    {
        ignores: ['eslint.config.mjs'],
    },
];