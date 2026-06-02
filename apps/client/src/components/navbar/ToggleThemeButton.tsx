import {Moon, Sun} from 'lucide-react'
import React from 'react'
import {useThemeStore} from '../../store/useThemeStore.ts'

export const ToggleThemeButton: React.FC = () => {
    const toggleTheme = useThemeStore((state) => state.toggleTheme)
    const isDarkMode = useThemeStore((state) => state.isDarkMode)

    return <button
        onClick={toggleTheme}
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        title="Змінити тему"
    >
        {isDarkMode ? <Sun size={20} className="text-yellow-400"/> : <Moon size={20}/>}
    </button>
}