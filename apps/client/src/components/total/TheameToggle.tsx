// components/ThemeToggle.tsx
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.ts';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-1 rounded-lg transition-colors duration-200
                 bg-slate-100 dark:bg-slate-800
                 hover:bg-slate-200 dark:hover:bg-slate-700
                 text-slate-800 dark:text-yellow-400"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? <Moon className="w-4 h-4" /> :  <Sun className="w-4 h-4" />         }
        </button>
    );
};