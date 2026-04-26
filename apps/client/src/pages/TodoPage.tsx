import {useLoaderData} from 'react-router'
import {taskLoader} from '../router/loaders'
import React, {useEffect, useState} from 'react'
import {getTodoArr} from '../utils/todo/getTodoArr'
import {AddTaskButton, TaskInputForm} from '../components/tasks'

export const TodoPage = () => {
    const {data} = useLoaderData<typeof taskLoader>()
    const [isAdd, setIsAdd] = React.useState<boolean>(false)
    const [tasks, setTasks] = useState<string[][]>([])

    useEffect(() => {
        if (data) {
            setTasks(getTodoArr(data))
        }
    }, [data])


    return <>
        {isAdd ? <TaskInputForm setIsAdd={setIsAdd}/>
            : <>
                <AddTaskButton setIsAdd={setIsAdd}/>
                <div className='w-full overflow-x-auto rounded-lg border border-slate-200 shadow-sm'>
                    <table className='w-full border-collapse bg-white text-left text-sm'>
                        <thead className='border-b border-slate-200 bg-slate-50/50'>
                        <tr>
                            <th className='px-4 py-3 font-semibold text-slate-700'>Статус</th>
                            <th className='px-4 py-3 font-semibold text-slate-700'>Опис завдання</th>
                            <th className='px-4 py-3 font-semibold text-slate-700'>Клієнт / Об'єкт</th>
                            <th className='px-4 py-3 font-semibold text-slate-700'>Дедлайн</th>
                            <th className='px-4 py-3 text-right font-semibold text-slate-700'>Сума (грн)</th>
                        </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-100'>
                        {tasks.map((task) => (
                            <tr key={task._id} className='hover:bg-indigo-50/30 transition-colors group'>
                                <td className='whitespace-nowrap px-4 py-3'>
                                    <input
                                        type='checkbox'
                                        checked={task.completed}
                                        className='h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500'
                                    />
                                </td>
                                <td className='px-4 py-3'>
                                    <div
                                        className={`font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                                        {task.title}
                                    </div>
                                    {task.category && (
                                        <span
                                            className='text-[10px] uppercase tracking-wider text-slate-400'>{task.category}</span>
                                    )}
                                </td>
                                <td className='px-4 py-3 text-slate-600'>{task.client || '—'}</td>
                                <td className='whitespace-nowrap px-4 py-3 text-slate-600'>
                <span className={task.isUrgent ? 'font-bold text-red-500' : ''}>
                  {task.dueDate}
                </span>
                                </td>
                                <td className='whitespace-nowrap px-4 py-3 text-right font-mono text-slate-700'>
                                    {task.amount ? task.amount.toLocaleString('uk-UA', {minimumFractionDigits: 2}) : '0,00'}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </>
        }
    </>
}