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
            '@headquarters/shared': path.resolve(__dirname, '../../packages/shared'),
        },
    },
    server: {
        host: '0.0.0.0', // Дозволяє підключення ззовні контейнера
        port: 5174,
        watch: {
            usePolling: true, // Потрібно для HMR, якщо ви працюєте на Windows/WSL2
        },
    },
})
