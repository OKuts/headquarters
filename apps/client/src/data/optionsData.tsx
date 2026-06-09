import type {MenuOption} from '../types/contextMenuTypes.ts'
import {ArrowUpFromLine, BrushCleaning, Edit, Trash2} from 'lucide-react'

export const options = {
    DEPARTMENTS: 'DEPARTMENTS',
    WORKERS: 'WORKERS'
} as const

export type TOptions = typeof options[keyof typeof options]

export const DEPARTMENTS_OPTIONS: MenuOption[] = [
    {label: 'Редагувати назву', value: 'EDIT', icon: <Edit size={16}/>},
    {label: 'Обрати старший підрозділ', value: 'ADD_MAIN', icon: <ArrowUpFromLine size={16}/>},
    {label: 'Видалити старший підрозділ', value: 'DELETE_MAIN', icon: <BrushCleaning size={16}/>},
    {label: 'Видалити підрозділ', value: 'DELETE', icon: <Trash2 size={16}/>, color: 'text-red-600'},
]

export const WORKERS_OPTIONS: MenuOption[] = [
    {label: 'Редагувати роль', value: 'EDIT', icon: <Edit size={16}/>},
    {label: 'Змінити підрозділ', value: 'EDIT', icon: <Edit size={16}/>},
    {label: 'Видалити співробітника', value: 'DELETE', icon: <Trash2 size={16}/>, color: 'text-red-600'},
]