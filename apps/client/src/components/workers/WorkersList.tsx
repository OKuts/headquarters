import {useMemo, useState} from 'react'
import {useWorkerData} from '../../hooks'
import {SearchInput} from '../../elements'

export const WorkersList = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const {workers} = useWorkerData()


    const filteredWorkers = useMemo(() => workers
            ? workers.filter(worker => (
                typeof worker.department === 'string' &&
                (!searchTerm
                    || worker.name.toLowerCase().includes(searchTerm.toLowerCase())
                    || (worker.department.toLowerCase().includes(searchTerm.toLowerCase()))))
            ).sort((a, b) => a.name > b.name ? 1 : -1)
            : []
        , [workers, searchTerm]
    )

    return <>
        <div className={'flex justify-between items-center w-full mb-2'}>
            <SearchInput setSearchTerm={setSearchTerm}/>
        </div>
        <div className="w-full max-w-6xl mx-auto my-8 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="border border-slate-200 rounded-lg">
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
                            {(['inn', 'name', 'department', 'role'] as const).map((el) =>
                                <td key={el} className="px-6 py-4 font-medium text-slate-900">
                                    {typeof person[el] === 'string' ? person[el] : ''}
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}