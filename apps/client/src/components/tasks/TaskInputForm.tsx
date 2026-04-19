import {useState} from 'react'
import {Calendar, Clock, Hash, PlusCircle} from 'lucide-react'
import type {TTaskType} from '@headquarters/shared'
import {createTask} from '../../utils/api/createTask.ts'

export const TaskInputForm = () => {
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [repeatType, setRepeatType] = useState<TTaskType>('once') // 'once', 'monthly', 'weekly'
    const [value, setValue] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const taskData = {
            title: taskName,
            type: repeatType,
            deadline: new Date(value),
        }
        console.log('Збереження завдання:', taskData)
        const result = await createTask(taskData)
        console.log(result)
    }


    return (
        <div
            className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 transition-colors">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                <PlusCircle className="text-blue-500"/> Додати нове завдання
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                            {id: 'once', label: 'Дата', icon: Calendar},
                            {id: 'monthly', label: 'Щомісяця', icon: Hash},
                            {id: 'weekly', label: 'Щотижня', icon: Clock},
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
                    {repeatType === 'once' && (
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

                    {repeatType === 'monthly' && (
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

                    {repeatType === 'weekly' && (
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">День тижня</label>
                            <select
                                required
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="" disabled className="dark:bg-gray-900">Оберіть день</option>
                                <option value="1" className="dark:bg-gray-900">Понеділок</option>
                                <option value="2" className="dark:bg-gray-900">Вівторок</option>
                                <option value="3" className="dark:bg-gray-900">Середа</option>
                                <option value="4" className="dark:bg-gray-900">Четвер</option>
                                <option value="5" className="dark:bg-gray-900">П'ятниця</option>
                                <option value="6" className="dark:bg-gray-900">Субота</option>
                                <option value="0" className="dark:bg-gray-900">Неділя</option>
                            </select>
                        </div>
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