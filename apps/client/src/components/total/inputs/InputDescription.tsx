import {Pencil} from 'lucide-react'
import type {FieldValues, UseFormRegister} from 'react-hook-form'

type Props = {
    register:  UseFormRegister<FieldValues>
    name: string
    label: string
}


export const InputDescription = ({register, name, label}: Props) => {
    return <div>

        <label className="block text-sm font-medium mt-5 text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
        <div className="relative">
            <Pencil className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
            <textarea
                {...register(name)}
                className="w-full pl-11 pr-4 py-2.5 min-w-xs min-h-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
            />
        </div>
    </div>
}