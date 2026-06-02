import {useEffect, useMemo, useState} from 'react'
import {AddSearchWrapper} from '../../elements/AddSearchWrapper'
import type {IPerson} from '@headquarters/shared/models/PersonModel.ts'
import {personsClientApi} from '../../api/personClientApi.ts'
import {userLogger} from '../../utils/logger/logger.ts'
import {useAdminStore} from '../../store'
import {Check} from 'lucide-react'

type Props = {
    setAdd: (isAdd: string) => void
    watch: string
}

export const PersonList = ({setAdd, watch}: Props) => {
    const {admin} = useAdminStore()
    const [searchTerm, setSearchTerm] = useState('')
    const [persons, setPersons] = useState<IPerson[]>([])
    const [isAll, setIsAll] = useState<boolean>(true)
    const [mayDelete, setMayDelete] = useState<string>('')

    const  filteredPersons = useMemo(() => persons.filter(person =>
        (isAll || person.access) && (!searchTerm || person.name.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [isAll, persons, searchTerm])

    useEffect(() => {
        (async () => {
            const url = `${import.meta.env.VITE_API_URL}/api/personal`
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setPersons(data)
                })
        })()
    }, [])

    // Обробник зміни доступу
    const handleToggleAccess = async (_id: string, access: boolean) => {
        if (admin) {
            if (mayDelete === _id) {
                personsClientApi({_id, access: !access}, 'PATCH')
                    .then(res => {
                        userLogger.show(res.message, 'success')
                        setPersons(prevState => [...prevState.map(el => el._id === res.out._id ? res.out : el)])
                    })
                setMayDelete('')
            } else {
                setMayDelete(_id)
                userLogger.show('Для видалення співробітника натисніть ще раз', 'warning')
            }
        } else {
            userLogger.show('Підтвердіть права адміністратора', 'error')
        }
    }

    if (persons.length === 0) return null

    return <>
        <AddSearchWrapper setSearchTerm={setSearchTerm} setAdd={setAdd} watch={watch} text={'Персонал'}/>
        <div className="w-full max-w-6xl mx-auto my-8 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="min-w-full divide-y divide-slate-200 bg-white text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-xs font-semibold tracking-wider text-slate-700">
                    <tr>
                        <th scope="col" className="px-6 py-4">inn</th>
                        <th scope="col" className="px-6 py-4">name</th>
                        <th scope="col" className="px-6 py-4 text-center flex items-center justify-center">
                            access
                            <Check onClick={() => setIsAll(!isAll)} strokeWidth={4} className={`ml-2 ${isAll ? 'text-green-500' : 'text-gray-500'}`}/>
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                    {filteredPersons.map((person) => (
                        <tr key={person._id}
                            className={`transition-colors hover:bg-slate-50/70 ${!person.access ? 'bg-slate-50/40' : ''}`}>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div
                                            className={`font-medium ${person.access ? 'text-slate-900' : 'text-slate-500 line-through'}`}>
                                            {person.inn}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div
                                            className={`font-medium ${person.access ? 'text-slate-900' : 'text-slate-500 line-through'}`}>
                                            {person.name}
                                        </div>
                                        {/*<div className="text-xs text-slate-500">{user.email}</div>*/}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex justify-center">
                                    <label className="relative inline-flex items-center cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={person.access}
                                            onChange={() => handleToggleAccess(person._id, person.access ?? false)}
                                            className="sr-only peer"
                                        />
                                        <div
                                            className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}