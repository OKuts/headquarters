import {User} from 'lucide-react'

export const InputDocument =({register, name, label})=> {
    return <div>

    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
    <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
        <input
            {...register(name)}
            type="text"
            className="w-full pl-11 pr-4 py-2.5 min-w-xs max-w-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
            placeholder="номер документу"/>
    </div>
    </div>
}