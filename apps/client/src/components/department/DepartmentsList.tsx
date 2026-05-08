import {useMemo, useState} from 'react'
import {Search, User, Users, UserStar} from 'lucide-react'
import {useDepartmentsStore} from '../../store'
import {ActionMenu} from '../total/ContextMenu.tsx'
import type {ActionType} from '../../types/contextMenuTypes.ts'
import {departmentsClientApi} from '../../api'

type Props = {
    setIsAdd: (isAdd: boolean)=> void
    isAdmin: boolean
}

export const DepartmentsList = ({setIsAdd, isAdmin}: Props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [details, setDetails] = useState<string[]>([])
    const {departments, deleteDepartment, setCurrId} = useDepartmentsStore()

    const filteredDepartments = useMemo(() => {
        if (departments.length) {
            return departments.filter(({department}) => department.toLowerCase().includes(searchTerm.toLowerCase()))
        }
    }, [departments, searchTerm])

    const showDetailsHandler = (id: string) => {
        if (!details.includes(id)) {
            setDetails([...details, id])
        } else {
            setDetails(details.filter(el => el !== id))
        }
    }

    const onAction = async (actionType: ActionType, _id: string) => {
        switch (actionType) {
            case 'DELETE': {
                const {data} = await departmentsClientApi({method: 'DELETE', data: {_id}})
                if (data.deletedCount) {
                    deleteDepartment(_id)
                    setCurrId('')
                }
            }
            break
            case 'EDIT': {
                setIsAdd(true)
                setCurrId(_id)
            }
                break
        }
    }

    if (!filteredDepartments) return null

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Підрозділи компанії</h2>

                {/* Пошук */}
                <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
                    <input
                        type="text"
                        placeholder="Пошук підрозділу..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredDepartments.map((dept) => (
                <div key={dept._id}
                     onClick={() => showDetailsHandler(dept._id)}
                     className="bg-white mb-2 rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <div
                        className="flex justify-between text-lg pl-8 font-semibold text-blue-700 mb-2 underline underline-offset-4 decoration-blue-200">
                        {dept.department}
                        {isAdmin && <ActionMenu onAction={onAction} id={dept._id}/>}
                    </div>

                    {details.includes(dept._id) && <>
                        {dept.employeesCount && <div className="flex items-center pl-8 text-gray-600 text-sm">
                            <UserStar className="mr-2 text-gray-400" size={16}/>
                            <span className="font-medium mr-1">Начальник:</span> {dept.employeesCount}
                        </div>}
                        {dept.employeesCount && <div className="flex items-center pl-8 text-gray-600 text-sm">
                            <User className="mr-2 text-gray-400" size={16}/>
                            <span className="font-medium mr-1">Заступник начальника:</span> {dept.employeesCount}
                        </div>}
                        {dept.employeesCount && <div className="flex items-center pl-8 text-gray-600 text-sm">
                            <Users className="mr-2 text-gray-400" size={16}/>
                            <span className="font-medium mr-1">Співробітників:</span> {dept.employeesCount}
                        </div>}
                        {dept.main && <div className="flex items-center pl-16 text-gray-600 text-sm">
                            {/*<UserTie className="mr-2 text-gray-400" size={16} />*/}
                            <span className="font-medium mr-1">Підпорядкований:</span> {dept.main}
                        </div>}

                        {dept.sub && <div className="pl-20 text-gray-600 text-sm">
                            <div className="font-medium mr-1">Підлеглі підрозділи:</div>
                            {dept.sub.map(unit => <div key={unit._id} className={'ml-4'}>{unit.department}</div>)}
                        </div>}
                    </>}

                </div>
            ))}
            {filteredDepartments.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    Підрозділів за вашим запитом не знайдено.
                </div>
            )}
        </div>
    )
}