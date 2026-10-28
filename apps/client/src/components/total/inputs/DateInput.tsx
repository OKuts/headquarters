import React from 'react'
import type {UseFormRegister, FieldValues, Path} from 'react-hook-form'

interface DateInputProps<T extends FieldValues> {
    name: Path<T>;
    register: UseFormRegister<T>;
    label?: string;
    icon?: React.ReactNode;
    className?: string;
}

export const DateInput = <T extends FieldValues>({
                                                     name,
                                                     register,
                                                     label,
                                                     icon,
                                                     className = '',
                                                 }: DateInputProps<T>) => {
    return (
        <div className="w-full space-y-1.5 text-slate-900 dark:text-white" >
            {label && (
                <label className="block text-sm font-medium">
                    {label}
                </label>
            )}
            <div className="relative flex items-center">
                {/* Іконка зліва (наприклад, календар або іконка користувача) */}
                {icon && (
                    <span className="absolute left-4 text-slate-400 flex items-center pointer-events-none">
            {icon}
          </span>
                )}

                <input
                    type="date"
                    {...register(name)}
                    className={`w-full pl-11 pr-4 py-2.5 max-w-43 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:[color-scheme:dark] ${className}`}
                />
            </div>
        </div>
    )
}