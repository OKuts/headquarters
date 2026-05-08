import React, {useState} from 'react'
import {Calendar, Clock, Hash, LogOut, PlusCircle} from 'lucide-react'
import {ETaskType, EWeek} from '@headquarters/shared'
import {createTask} from '../../api/createTask.ts'
import {useForm} from 'react-hook-form'

type Props = {
    setIsAdd: (value: boolean) => void,
}

export const TaskInputForm: React.FC<Props> = ({setIsAdd}) => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [repeatType, setRepeatType] = useState<ETaskType>(ETaskType.ONCE)
    const [value, setValue] = useState('')

    const handleSubmitOld = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const curValue = !value && repeatType === ETaskType.WEEKLY ? '1' : value
        const taskData = {
            title: taskName,
            type: repeatType,
            deadline: curValue,
            description: taskDescription,
        }
        setValue('')
        setRepeatType(ETaskType.ONCE)
        setTaskDescription('')
        setTaskName('')
        setIsAdd(false)
        await createTask(taskData)
    }

    const handlerOut = () => {
        setValue('')
        setRepeatType(ETaskType.ONCE)
        setTaskDescription('')
        setTaskName('')
        setIsAdd(false)
    }

    return (
        <div
            className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 transition-colors">
            <div className={'flex justify-between'}>
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                    <PlusCircle className="text-blue-500"/> Додати нове завдання
                </h2>
                <LogOut onClick={handlerOut} size={20}/>
            </div>

            <form onSubmit={handleSubmitOld} className="space-y-4">
                {/* Назва завдання */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Назва завдання
                    </label>
                    <input
                        type="text"
                        required
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Наприклад: Здати звіт Form 2-ds"
                    />
                </div>
                {/* Назва завдання */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Короткий опис
                    </label>
                    <textarea
                        rows={2} // Початкова кількість рядків
                        required
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className="
        w-full px-4 py-2 rounded-lg border outline-none transition-all resize-y min-h-[50px]
        /* Світла тема */
        bg-transparent border-gray-300 text-gray-900 placeholder:text-gray-400
        /* Темна тема */
        dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500
        /* Стан фокусу */
        focus:ring-2 focus:ring-blue-500 focus:border-transparent
    "
                        placeholder="Опишіть деталі завдання або примітки до звіту Form 2-ds..."
                        spellCheck="false"
                    />
                </div>

                {/* Вибір типу терміну */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Тип виконання
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            {id: ETaskType.ONCE, label: 'Дата', icon: Calendar},
                            {id: ETaskType.MONTHLY, label: 'Щомісяця', icon: Hash},
                            {id: ETaskType.WEEKLY, label: 'Щотижня', icon: Clock},
                        ].map((type) => (
                            <button
                                key={type.id}
                                type="button"
                                onClick={() => {
                                    setRepeatType(type.id)
                                    setValue('')
                                }}
                                className={`flex flex-col items-center p-2 rounded-lg border text-xs transition-all ${
                                    repeatType === type.id
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                        : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                            >
                                <type.icon size={18} className="mb-1"/>
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Динамічне поле введення */}
                <div className="pt-2">
                    {repeatType === ETaskType.ONCE && (
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Оберіть конкретну дату</label>
                            <input
                                type="date"
                                required
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    )}

                    {repeatType === ETaskType.MONTHLY && (
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Число місяця (1-31)</label>
                            <input
                                type="number"
                                min="1"
                                max="31"
                                required
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Наприклад: 20"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    )}

                    {repeatType === ETaskType.WEEKLY && (
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">День тижня</label>
                            <select
                                required
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                {Object.entries(EWeek).map(([key, value], i) =>
                                    <option key={value} value={value} disabled={!i}
                                            className="dark:bg-gray-900">{key}</option>)}
                            </select>
                        </div>
                    )}
                </div>
                {/* Select: Доручити */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Доручити
                    </label>
                    <select
                        {...register('department', {required: 'Оберіть виконавця'})}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none text-slate-900 dark:text-white"
                    >
                        <option value="">Оберіть виконавця . . .</option>
                        {['1', '2'].map(el => <option value={el}>{el}</option>)}
                    </select>
                    {errors.department && (
                        <span className="text-red-500 text-xs mt-1">{errors.department.message as string}</span>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
                >
                    Створити завдання
                </button>
            </form>
        </div>
    )
}