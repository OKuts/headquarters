import {Fragment, useEffect, useRef, useState} from 'react'
import {MoreVertical} from 'lucide-react'
import type {ActionType} from '../../types/contextMenuTypes.ts'
import {MENU_OPTIONS} from '../../data'
import type {IDepartment} from '@headquarters/shared'



type Props = {
    dept: IDepartment
    onAction: (onAction: ActionType, id: string) => void
}

// 2. Основний компонент
export const ActionMenu = ({onAction, dept}: Props) => {
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
                <MoreVertical size={20}/>
            </button>

            {/* Саме меню (позиційоване відносно батьківського div) */}
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-70 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
                    <div className="py-1">
                        {MENU_OPTIONS.map((option, i) => <Fragment key={i}>
                            {(i !== 2 || dept.main) && <button
                                onClick={() => {
                                    onAction(option.value, dept._id)
                                    setIsOpen(false)
                                }}
                                className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${option.color || 'text-gray-700'}`}
                            >
                                <span className="mr-3">{option.icon}</span>
                                {option.label}
                            </button>}
                        </Fragment>)}
                    </div>
                </div>
            )}
        </div>
    )
}

