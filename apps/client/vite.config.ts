import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import saver from 'vite-plugin-svgr'
import path from 'path'
import tailwindcss from '@tailwindcss/vite' // Додаємо цей імпорт

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(), // Активуємо Tailwind
        saver()
    ],
    resolve: {
        alias: {
            // Пряме посилання на вхідний файл спільного пакета
            '@headquarters/shared': path.resolve(__dirname, '../../packages/shared/index.ts'),
        },
    },
    server: {
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
})
