import {Fragment, useMemo, useState} from 'react'
import {useWorkerData} from '../../hooks'
import {SearchInput} from '../../elements'
import {useAdminStore} from '../../store'
import {ActionMenu} from '../total'
import {options, WORKERS_OPTIONS} from '../../data'

export const WorkersList = () => {
    const {admin} = useAdminStore()
    const [searchTerm, setSearchTerm] = useState('')
    const {workers} = useWorkerData()


    const filteredWorkers = useMemo(() => workers
            ? workers.filter(worker => (
                !searchTerm
                || worker.name.toLowerCase().includes(searchTerm.toLowerCase())
                || worker.department.toLowerCase().includes(searchTerm.toLowerCase()))
            ).sort((a, b) => a.name > b.name ? 1 : -1)
            : []
        , [workers, searchTerm]
    )

    const onAction = (data) => {
        console.log(data)
    }

    return <>
        <div className={'flex justify-between items-center w-full mb-2'}>
            <SearchInput setSearchTerm={setSearchTerm}/>
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="min-w-full divide-y divide-slate-200 bg-white text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-xs font-semibold tracking-wider text-slate-700">
                    <tr>
                        <th scope="col" className="px-6 py-4">inn</th>
                        <th scope="col" className="px-6 py-4">name</th>
                        <th scope="col" className="px-6 py-4">department</th>
                        <th scope="col" className="px-6 py-4">role</th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                    {filteredWorkers.map((person) => (
                        <tr key={person._id} className={'transition-colors'}>
                            {(['inn', 'name', 'department', 'role'] as const).map((el) => <Fragment key={el}>
                                    <td className="px-6 py-4 font-medium text-slate-900" key={el}>
                                        {person[el] || ''}
                                    </td>
                                    {el === 'role' && admin && <td><ActionMenu onAction={onAction} dept={person} optionList={WORKERS_OPTIONS} type={options.WORKERS}/></td>}
                                </Fragment>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}