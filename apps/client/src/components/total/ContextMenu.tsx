import {useState, useRef, useEffect} from 'react'
import {Edit, Trash2, MoreVertical, ArrowUpFromLine, ArrowDownFromLine} from 'lucide-react'
import type {ActionType, MenuOption} from '../../types/contextMenuTypes.ts' // Іконки для наочності

// 1. Визначаємо типи та сталий список дій


const MENU_OPTIONS: MenuOption[] = [
    { label: 'Редагувати назву', value: 'EDIT', icon: <Edit size={16} /> },
    { label: 'Обрати старший підрозділ', value: 'ADD_MAIN', icon: <ArrowUpFromLine size={16} /> },
    { label: 'Обрати підлеглі підрозділи', value: 'SELECT_SUB', icon: <ArrowDownFromLine size={16} /> },
    { label: 'Видалити', value: 'DELETE', icon: <Trash2 size={16} />, color: 'text-red-600' },
]

type Props = {
    id: string,
    onAction: (onAction: ActionType, id: string) => void
}

// 2. Основний компонент
export const ActionMenu = ({ onAction, id } : Props)  => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Закриття меню при кліку поза ним
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            {/* Кнопка виклику меню */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
                <MoreVertical size={20} />
            </button>

            {/* Саме меню (позиційоване відносно батьківського div) */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-70 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
                    <div className="py-1">
                        {MENU_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onAction(option.value, id)
                                    setIsOpen(false)
                                }}
                                className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${option.color || 'text-gray-700'}`}
                            >
                                <span className="mr-3">{option.icon}</span>
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

