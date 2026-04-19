import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// 1. Визначаємо інтерфейс сховища
interface ThemeState {
    isDarkMode: boolean
    toggleTheme: () => void
    setTheme: (isDark: boolean) => void
}

// 2. Створюємо стор із вказанням типу <ThemeState>
export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            isDarkMode: true,

            // Функція перемикання
            toggleTheme: () => set((state) => {
                const nextMode = !state.isDarkMode
                // Маніпуляції з DOM краще робити через побічний ефект,
                // але для простоти можна залишити і тут
                updateThemeClass(nextMode)
                return { isDarkMode: nextMode }
            }),

            // Функція встановлення конкретного значення
            setTheme: (isDark: boolean) => {
                updateThemeClass(isDark)
                set({ isDarkMode: isDark })
            },
        }),
        {
            name: 'theme-storage', // унікальне ім'я для localStorage
            storage: createJSONStorage(() => localStorage), // явне вказання сховища
        }
    )
)

// Допоміжна функція для чистоти коду
const updateThemeClass = (isDark: boolean): void => {
    if (typeof window !== 'undefined') {
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }
}