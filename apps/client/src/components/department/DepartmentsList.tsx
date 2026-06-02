import {useMemo, useState} from 'react'
import {useAdminStore, useDepartmentsStore} from '../../store'
import {ActionMenu} from '../total/ContextMenu.tsx'
import type {ActionType} from '../../types/contextMenuTypes.ts'
import {departmentsClientApi} from '../../api'
import {DepartmentsRadio} from './DepartmentsRadio.tsx'
import {getDepartment} from '../../utils/departments/getDepartment.ts'
import {userLogger} from '../../utils/logger/logger.ts'
import {AddSearchWrapper} from '../../elements/AddSearchWrapper.tsx'
import {WorkersUnitList} from '../workers'
import {useWorkerData} from '../../hooks'

type Props = {
    setAdd: (isAdd: string) => void
    watch: string
}

export const DepartmentsList = ({setAdd, watch}: Props) => {
    const {departments, deleteDepartment, setCurrId, updateDepartment} = useDepartmentsStore()
    const {workers} = useWorkerData()
    const {admin} = useAdminStore()
    const [searchTerm, setSearchTerm] = useState('')
    const [isRadioUnit, setIsRadioUnit] = useState<boolean>(false)

    const currWorkers = useMemo(() => {
        if (!workers || !workers.length) return {}
        return workers.reduce((acc, worker) => {
            const dept = worker.department
            const workerData: [string, string] = [worker.name, worker.role]
            if (!acc[dept]) acc[dept] = []
            acc[dept].push(workerData)
            return acc
        }, {} as Record<string, [string, string][]>)

    }, [workers])

    const filteredDepartments = useMemo(() => {
        if (departments.length) {
            return departments.filter(({department}) => department.toLowerCase().includes(searchTerm.toLowerCase()))
        } else return []
    }, [departments, searchTerm])

    const onAction = async (actionType: ActionType, _id: string) => {
        const currentDepartment = getDepartment(_id, departments)
        if (currentDepartment) {
            switch (actionType) {
                case 'DELETE': {
                    console.log(workers)
                    if (currentDepartment && (!currentDepartment.sub || currentDepartment.sub.length === 0)) {


                        const {data} = await departmentsClientApi({method: 'DELETE', ...{_id}})
                        if (data.deletedCount) {
                            deleteDepartment(_id)
                            setCurrId('')
                            userLogger.show(`Ви видалили підрозділ: ${currentDepartment.department}`, 'success')
                        }
                    } else {
                        userLogger.show('Операція неможлива! Перепорядкуйте (видаліть) підлеглі підрозділи', 'error')
                    }
                }
                    break
                case 'EDIT': {
                    setAdd('unit')
                    setCurrId(_id)
                }
                    break
                case 'ADD_MAIN':
                case 'DELETE_MAIN': {
                    if (currentDepartment && currentDepartment.main) {
                        const result = await departmentsClientApi({
                            method: 'PATCH',
                            _id: currentDepartment.main._id,
                            add: {sub: _id}
                        })
                        if (result) {
                            updateDepartment(result.data)
                            userLogger.show(`Старший підроділ ${currentDepartment.main.department} припинив зв'язок: `, 'success')
                            const {data} = await departmentsClientApi({method: 'PATCH', ...{_id}, add: {main: ''}})
                            if (data) {
                                updateDepartment(data)
                                userLogger.show(`Ви відкріпили підрозділ: ${currentDepartment.department}`, 'success')
                            }
                        }
                    }
                    if (actionType === 'ADD_MAIN') {
                        setIsRadioUnit(true)
                        setCurrId(_id)
                    }
                }
                    break
            }
        }
    }

    if (!filteredDepartments) return null

    return (<>
            <AddSearchWrapper setSearchTerm={setSearchTerm} setAdd={setAdd} watch={watch} text={'Підрозділи'}/>
            <div className="p-6 max-w-6xl mx-auto">

                {isRadioUnit && admin && <DepartmentsRadio setIsRadioUnit={setIsRadioUnit}/>}

                {filteredDepartments.map((dept) => (
                    <div key={dept._id}
                         className="bg-white mb-2 rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                        <div
                            className="flex justify-between text-lg pl-8 font-semibold text-blue-700 mb-2 underline underline-offset-4 decoration-blue-200">
                            {dept.department}
                            {admin && watch === 'units' && <ActionMenu onAction={onAction} dept={dept}/>}
                        </div>
                        {dept?.main && <div className="flex items-center pl-16 text-gray-600 text-sm">
                            <span className="font-medium mr-1">Підпорядкований:</span>
                            {dept?.main.department}
                        </div>}

                        {dept?.sub && dept.sub.length > 0 && <div className="pl-20 text-gray-600 text-sm">
                            <div className="font-medium mr-1">Підлеглі підрозділи:</div>
                            {dept.sub.map((unit, i) => <div key={i} className={'ml-4'}>{unit.department}</div>)}
                        </div>}
                        {watch === 'all' && <WorkersUnitList workers={currWorkers[dept.department]}/>}
                    </div>
                ))}
                {filteredDepartments.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        Підрозділів за вашим запитом не знайдено.
                    </div>
                )}
            </div>
        </>
    )
}