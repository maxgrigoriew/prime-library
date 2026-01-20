import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';

export default [
    // Базовые правила
    js.configs.recommended,
    ...vuePlugin.configs['flat/recommended'],

    {
        files: ['**/*.{ts,tsx,vue}'],
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                parser: {
                    // Для TypeScript в script setup
                    ts: tsParser,
                    // Для обычного JavaScript
                    js: 'espree',
                    // Для JSX/TSX
                    tsx: tsParser,
                },
                extraFileExtensions: ['.vue'],
            },
        },
    },

    // Правила импортов
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling', 'index'],
                        'object',
                        'type',
                    ],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                    pathGroups: [
                        {
                            pattern: 'vue',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: 'vue-*',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '@/**',
                            group: 'internal',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                },
            ],

            // Отключаем правила Vue
            'vue/multi-word-component-names': 'off',
        },
    },
];