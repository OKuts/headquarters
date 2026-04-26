import js from '@eslint/js'
import ts from 'typescript-eslint'

export default ts.config(
    js.configs.recommended,
    ...ts.configs.recommended,
    {
        // Важливо: вказуємо парсер для TS файлів
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            'quotes': ['error', 'single'],
            'semi': ['error', 'never'],
            // 'no-undef' часто видає помилкові спрацьовування в TS,
            // бо сам TS вже перевіряє це краще. Його можна вимкнути для TS.
            'no-undef': 'off'
        }
    },
    {
        // Окреме правило для JS файлів (без парсера TS)
        files: ['**/*.js', '**/*.mjs'],
        rules: {
            'quotes': ['error', 'single'],
            'semi': ['error', 'never']
        }
    }
)