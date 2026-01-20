import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';

export default [
    // Базовые правила
    js.configs.recommended,

    // Глобальные переменные
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },

    // Vue правила
    // ...vuePlugin.configs['flat/vue3-essential'],
    ...vuePlugin.configs['flat/recommended'],

    // TypeScript поддержка
    {
        files: ['**/*.{ts,tsx,vue}'],
        languageOptions: {
            parser: tsParser,
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