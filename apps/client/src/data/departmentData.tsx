import type {MenuOption} from '../types/contextMenuTypes.ts'
import {ArrowUpFromLine, BrushCleaning, Edit, Trash2} from 'lucide-react'

export const MENU_OPTIONS: MenuOption[] = [
    {label: 'Редагувати назву', value: 'EDIT', icon: <Edit size={16}/>},
    {label: 'Обрати старший підрозділ', value: 'ADD_MAIN', icon: <ArrowUpFromLine size={16}/>},
    {label: 'Видалити старший підрозділ', value: 'DELETE_MAIN', icon: <BrushCleaning size={16}/>},
    {label: 'Видалити підрозділ', value: 'DELETE', icon: <Trash2 size={16}/>, color: 'text-red-600'},
]