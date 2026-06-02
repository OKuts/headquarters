import React, {useEffect, useState} from 'react'
import {type FieldValues, useForm} from 'react-hook-form'
import {Eye, EyeOff, Lock, User, UserKey} from 'lucide-react'
import {useAuthStore, useDepartmentsStore} from '../../store'
import {ERoles} from '@headquarters/shared/models/UserModel.ts'
import {useLoaderData} from 'react-router'
import {departmentsLoader} from '../../router/loaders'
import {userLogger} from '../../utils/logger/logger.ts'
import type {IDepartment} from '@headquarters/shared'
import {authClientApi} from '../../api'

export const AuthForm: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const {setCurrUser} = useAuthStore()
    const {data}: { data: IDepartment[], iaLoading: boolean } = useLoaderData<typeof departmentsLoader>()
    const {saveDepartments, departments} = useDepartmentsStore()
    const {register, handleSubmit, reset, formState: {errors}} = useForm()

    const toggleMode = () => setIsLogin(!isLogin)

    const onSubmit = async (data: FieldValues) => {
        const {login, name, password, department, inn, role} = data
        authClientApi(isLogin ? {login, password} : {login, name, password, department, inn, role})
            .then(res => res.json())
            .then(res => {
                setIsLogin(res.isLogin)
                if (res.isLogin) {
                    setCurrUser(res.user)
                    userLogger.show(res.message, 'success')
                } else {
                    userLogger.show(res.message, 'error')
                }
                reset()
            })
    }

    useEffect(() => {
        if (data) saveDepartments(data)
    }, [data, saveDepartments])

    return (
        <div
            className="m-auto w-full max-w-md p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {isLogin ? 'З поверненням' : 'Створити акаунт'}
                </h2>
                <p className="text-slate-500 mt-2">
                    {isLogin ? 'Введіть ваші дані для входу' : 'Заповніть форму для реєстрації'}
                </p>
            </div>

            <form onSubmit={handleSubmit((data) => onSubmit(data))}
                  className="space-y-5">
                {/* Login */}
                <div>
                    <label
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Login</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                        <input
                            {...register('login', {
                                required: 'Login обов’язковий',
                                pattern: {value: /.{4,}/i, message: 'Від 4 символів'}
                            })}
                            type="text"
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="kuts"/>
                    </div>
                    {errors.login &&
                        <span className="text-red-500 text-xs mt-1">{errors.login.message as string}</span>}
                </div>

                {!isLogin && <>
                    {/* inn */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">РНОКПП
                            (паспорт)</label>
                        <div className="relative">
                            <UserKey className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                            <input
                                {...register('inn', {
                                    required: 'Дані обов\'язкові',
                                    pattern: {value: /.{8,10}/i, message: 'Від 8 до 10 символів'}
                                })}
                                type="text"
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="inn/passport"/>
                        </div>
                        {errors.inn &&
                            <span className="text-red-500 text-xs mt-1">{errors.inn.message as string}</span>}
                    </div>
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Прізвище,
                            ім'я та по-батькові</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                            <input
                                {...register('name', {
                                    required: 'ПІБ обов\'язкові',
                                    pattern: {value: /.{4,}/i, message: 'Від 4 символів'}
                                })}
                                type="text"
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="kuts"/>
                        </div>
                        {errors.name &&
                            <span className="text-red-500 text-xs mt-1">{errors.name.message as string}</span>}
                    </div>
                    {/* Select: Підрозділ */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Підрозділ
                        </label>
                        <select
                            {...register('department', {required: 'Оберіть підрозділ'})}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none text-slate-900 dark:text-white"
                        >
                            <option value="">Оберіть . . .</option>
                            {departments.map(el => <option value={el._id}>{el.department}</option>)}
                        </select>
                        {errors.department && (
                            <span className="text-red-500 text-xs mt-1">{errors.department.message as string}</span>
                        )}
                    </div>

                    {/*Radio Group*/}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Ваша посада
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {Object.values(ERoles).map((option) => (
                                <label key={option} className="relative flex cursor-pointer">
                                    <input
                                        {...register('role', {required: 'Оберіть тип посади'})}
                                        type="radio"
                                        value={option}
                                        className="peer sr-only"/>
                                    <div
                                        className="w-full text-center py-2 px-3 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 peer-checked:text-blue-600 dark:peer-checked:text-blue-400 transition-all hover:bg-slate-100 dark:hover:bg-slate-700">
                                        {option}
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.role && (
                            <span className="text-red-500 text-xs mt-1">{errors.role.message as string}</span>
                        )}
                    </div>
                </>
                }
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
                    {isLogin ? 'Увійти' : 'Зареєструватися'}
                </button>
            </form>
            <div className="mt-6 text-center">
                <button
                    onClick={toggleMode}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                    {isLogin ? 'Ще немає акаунту? Створіть його' : 'Вже є акаунт? Увійдіть'}
                </button>
            </div>
        </div>
    )
}