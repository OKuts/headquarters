import {type FC, useState} from 'react'
import {ModalWrap} from '../total/ModalWrap.tsx'
import {Eye, EyeOff, Lock, User} from 'lucide-react'
import {type FieldValues, useForm} from 'react-hook-form'
import {userLogger} from '../../utils/logger/logger.ts'
import type {IAdmin} from '@headquarters/shared/models/AdminsModel.ts'

interface Props {
    onSuccess: (admin: string) => void // Функція, яка виконається при успішному паролі
    onCancel: (into: IAdmin | null) => void
    into: IAdmin
}

export const PasswordConfirm: FC<Props> = ({onSuccess, onCancel, into }: Props) => {
    const [showPassword, setShowPassword] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = async (data: FieldValues) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...data, _id: into._id})
            })
            if (response.ok) {
                const result = await response.json()
                if (result.isAdmin) onSuccess(data.admin)
            } else {
                userLogger.show('Доступ відхилено', 'error')
            }
        } catch (_) {
            userLogger.show('Помилка з\'єднання з сервером', 'error')
        }
    }


    return <ModalWrap onClose={() => onCancel(null) }>
            <div
                className="m-auto w-full max-w-md p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
                <form onSubmit={handleSubmit((data) => onSubmit(data))}
                      className="space-y-5">
                    {/* Login */}
                    <div>
                        <label
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Admin</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                            <input
                                {...register('admin', {
                                    required: 'Login адміністратора обов’язковий',
                                    pattern: {value: /.{2,}/i, message: 'Від 2 символів'}
                                })}
                                type="text"
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="kuts"/>
                        </div>
                        {errors.admin &&
                            <span className="text-red-500 text-xs mt-1">{errors.admin.message as string}</span>}
                    </div>
                    {/*Password Field*/}
                    <div>
                        <label
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Пароль</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                            <input
                                {...register('password', {
                                    required: 'Пароль обов’язковий',
                                    minLength: {value: 6, message: 'Мінімум 6 символів'}
                                })}
                                type={showPassword ? 'text' : 'password'}
                                className="w-full pl-11 pr-12 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="••••••••"/>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                            </button>
                        </div>
                        {errors.password &&
                            <span className="text-red-500 text-xs mt-1">{errors.password.message as string}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        Перевірити права доступу
                    </button>
                </form>
            </div>
        </ModalWrap>
}

