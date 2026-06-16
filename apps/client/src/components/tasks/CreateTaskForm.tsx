import { useForm, type SubmitHandler } from 'react-hook-form'
import type {ITaskForm} from '@headquarters/shared'
import {ModalWrap} from '../total'

type Props = {
    setIsAdd: (value: boolean) => void,
}

export const CreateTaskForm = ({setIsAdd}: Props) => {
    // Ініціалізуємо форму та задаємо дефолтне значення для типу виконання
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<ITaskForm>({
        defaultValues: {
            executionType: 'date', // За замовчуванням обрано "Дата"
            assignee: ''
        }
    })

    const currentExecutionType = watch('executionType')

    // Функція обробки успішного сабміту
    const onSubmit: SubmitHandler<ITaskForm> = (data) => {
        console.log('Дані створеного завдання:', data)
        setIsAdd(false)
    }

    return <ModalWrap onClose={()=> setIsAdd(false)}>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#111827] text-white p-6 rounded-xl max-w-md mx-auto space-y-5 shadow-lg"
        >

            {/* 1. Назва завдання */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-300">Назва завдання</label>
                <input
                    type="text"
                    placeholder="Наприклад: Здати звіт Form 2-ds"
                    {...register('title', { required: 'Введіть назву завдання' })}
                    className="bg-[#1f293d] border border-gray-700 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 transition-all text-sm placeholder-gray-500"
                />
                {errors.title && <span className="text-xs text-red-400">{errors.title.message}</span>}
            </div>

            {/* 2. Короткий опис */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-300">Короткий опис</label>
                <textarea
                    rows={3}
                    placeholder="Опишіть деталі завдання або примітки до звіту Form 2-ds..."
                    {...register('description')}
                    className="bg-[#1f293d] border border-gray-700 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 transition-all text-sm placeholder-gray-500 resize-none"
                />
            </div>

            {/* 3. Тип виконання (Кастомні кнопки-радіо) */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-300">Тип виконання</label>

                {/* Прихований інпут для реєстрації поля в react-hook-form */}
                <input type="hidden" {...register('executionType')} />

                <div className="grid grid-cols-3 gap-3">
                    {/* Кнопка: Дата */}
                    <button
                        type="button"
                        onClick={() => setValue('executionType', 'date')}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all gap-1
              ${currentExecutionType === 'date'
                            ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                            : 'border-gray-700 bg-[#1f293d]/50 text-gray-400 hover:bg-[#1f293d]'}`}
                    >
                        <span className="text-base">📅</span>
                        Дата
                    </button>

                    {/* Кнопка: Щомісяця */}
                    <button
                        type="button"
                        onClick={() => setValue('executionType', 'monthly')}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all gap-1
              ${currentExecutionType === 'monthly'
                            ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                            : 'border-gray-700 bg-[#1f293d]/50 text-gray-400 hover:bg-[#1f293d]'}`}
                    >
                        <span className="text-base">#</span>
                        Щомісяця
                    </button>

                    {/* Кнопка: Щотижня */}
                    <button
                        type="button"
                        onClick={() => setValue('executionType', 'weekly')}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-medium transition-all gap-1
              ${currentExecutionType === 'weekly'
                            ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                            : 'border-gray-700 bg-[#1f293d]/50 text-gray-400 hover:bg-[#1f293d]'}`}
                    >
                        <span className="text-base">🕒</span>
                        Щотижня
                    </button>
                </div>
            </div>

            {/* 4. Оберіть конкретну дату (Показується за умови, якщо обрано тип 'date') */}
            {currentExecutionType === 'date' && (
                <div className="flex flex-col gap-1.5 animate-fadeIn">
                    <label className="text-xs text-gray-400">Оберіть конкретну дату</label>
                    <input
                        type="date"
                        {...register('date', { required: 'Оберіть дату виконання' })}
                        className="bg-[#1f293d] border border-gray-700 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 transition-all text-sm text-gray-300 w-full color-scheme-dark"
                    />
                    {errors.date && <span className="text-xs text-red-400">{errors.date.message}</span>}
                </div>
            )}

            {/* 5. Доручити (Селект виконавця) */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-300">Виконавець</label>
                <select
                    {...register('assignee', { required: 'Будь ласка, оберіть виконавця' })}
                    className="bg-[#1f293d] border border-gray-700 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 transition-all text-sm text-gray-300 appearance-none cursor-pointer"
                >
                    <option value="" disabled hidden>Оберіть виконавця . . .</option>
                    <option value="user_1">Іван Іванов</option>
                    <option value="user_2">Марія Петренко</option>
                    <option value="user_3">Олексій Коваленко</option>
                </select>
                {errors.assignee && <span className="text-xs text-red-400">{errors.assignee.message}</span>}
            </div>

            {/* Кнопка відправки форми */}
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-sm shadow-md mt-2"
            >
                Створити завдання
            </button>

        </form>
    </ModalWrap>
}