import kuts from '../assets/kuts.svg'
import {useLoaderData, useNavigation,} from "react-router";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {getDaysFromToDate} from '../utils/dates/getDaysFromToDate'

export const AboutPage = () => {
    const data = useLoaderData()
    const navigation = useNavigation();
    const [report, setReport] = useState([])

    const [taskName, setTaskName] = useState('');
    const [repeatType, setRepeatType] = useState('once'); // 'once', 'monthly', 'weekly'
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            title: taskName,
            type: repeatType,
            deadline: value,
            createdAt: new Date().toISOString()
        };
        console.log('Збереження завдання:', taskData);
        // Тут логіка для вашої бази MongoDB через monorepo shared types
    };


    // const getCn = (line) => {
    //     const [diff, , status, , , mark] = line
    //     if (mark !== 'null') return 'text-gray-500'
    //     if (status !== '---' ) {
    //         return diff > -1 && diff < 6 ? 'text-green-500 font-bold' : 'text-gray-600'
    //     } else {
    //         return (diff < 0) ? 'text-red-600' : (diff < 6) ? 'text-green-500 font-bold' : 'text-gray-600'
    //     }
    // }

        useEffect(() => {
            if (data) {
                const arr = data
                    .map(line => getDaysFromToDate(line[0]).map(el => [...el, ...line.slice(1)]))
                    .flat()
                    .sort((a, b) => a[0] - b[0])
                setReport(arr)
            }
        }, [data])

        if (navigation.state === "loading") return null;

        return (
            <div>
                <img src={kuts} alt="Oleksandr Kuts" className={'h-20 w-20'}/>
                Oleksandr Kuts
                <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 transition-colors">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                        <PlusCircle className="text-blue-500" /> Додати нове завдання
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

                        {/* Вибір типу терміну */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Тип виконання
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { id: 'once', label: 'Дата', icon: Calendar },
                                    { id: 'monthly', label: 'Щомісяця', icon: Hash },
                                    { id: 'weekly', label: 'Щотижня', icon: Clock },
                                ].map((type) => (
                                    <button
                                        key={type.id}
                                        type="button"
                                        onClick={() => { setRepeatType(type.id); setValue(''); }}
                                        className={`flex flex-col items-center p-2 rounded-lg border text-xs transition-all ${
                                            repeatType === type.id
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        <type.icon size={18} className="mb-1" />
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
                {/*<table className="border-collapse text-left text-sm mx-auto">*/}
                {/*    <thead className="bg-gray-600">*/}
                {/*    <tr>*/}
                {/*        <th className="px-6 py-4 font-medium text-gray-900">Date</th>*/}
                {/*        <th className="px-6 py-4 font-medium text-gray-900">Status</th>*/}
                {/*        <th className="px-6 py-4 font-medium text-gray-900">Task</th>*/}
                {/*        <th className="px-6 py-4 font-medium text-gray-900">Who</th>*/}
                {/*        <th className="px-6 py-4 font-medium text-gray-900">Mark</th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody className="divide-y dark:divide-gray-100 border-t border-gray-100">*/}
                {/*    {report.map((line, i) => <tr key={i} className={getCn(line)}>*/}
                {/*        {line.slice(1).map((el, j) =>*/}
                {/*            <td key={j} className={j === 1 || j === 3 ? 'text-center' : ''}>*/}
                {/*                {el === 'null' ? '' : el}*/}
                {/*            </td>)}*/}
                {/*    </tr>)}*/}
                {/*    </tbody>*/}
                {/*</table>*/}
            </div>
        )
    }