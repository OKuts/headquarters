import js from '@eslint/js'
import globals from 'globals' // Потрібно імпортувати цей пакет

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,    // Додає console, process тощо для сервера
                ...globals.browser // Додає window, document для React-частини
            }
        },
        rules: {
            'quotes': ['error', 'single'],
            'semi': ['error', 'never'],
            'no-undef': 'error'
        }
    }
]