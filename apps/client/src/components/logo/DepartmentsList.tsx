import {useState} from 'react'
import {Search, User, Users, UserStar} from 'lucide-react'

export const DepartmentsList = ({departments}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [details, setDetails] = useState<string[]>([])

    const showDitails = (id: string) => {
        if (!details.includes(id)) {
            setDetails([...details, id])
        } else {
            setDetails(details.filter(el => el !== id))
        }
    }


    // const filteredDepts = departments.filter(dept =>
    //     dept.title.toLowerCase().includes(searchTerm.toLowerCase())
    // )

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

            {departments.map((dept) => (
                <div key={dept._id}
                     onClick={() => showDitails(dept._id)}
                     className="bg-white mb-2 rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <div
                        className="text-lg pl-8 font-semibold text-blue-700 mb-2 underline underline-offset-4 decoration-blue-200">
                        {dept.department}
                    </div>

                    {details.includes(dept._id) && <>
                        <div className="flex items-center pl-8 text-gray-600 text-sm">
                            <UserStar className="mr-2 text-gray-400" size={16}/>
                            <span className="font-medium mr-1">Начальник:</span> {dept.employeesCount}
                        </div>
                        <div className="flex items-center pl-8 text-gray-600 text-sm">
                            <User className="mr-2 text-gray-400" size={16}/>
                            <span className="font-medium mr-1">Заступник начальника:</span> {dept.employeesCount}
                        </div>
                        <div className="flex items-center pl-8 text-gray-600 text-sm">
                            <Users className="mr-2 text-gray-400" size={16}/>
                            <span className="font-medium mr-1">Співробітників:</span> {dept.employeesCount}
                        </div>
                        <div className="flex items-center pl-16 text-gray-600 text-sm">
                            {/*<UserTie className="mr-2 text-gray-400" size={16} />*/}
                            <span className="font-medium mr-1">Підпорядкований:</span> {dept.main}
                        </div>

                        {dept.sub && <div className="pl-20 text-gray-600 text-sm">
                            <div className="font-medium mr-1">Підлеглі підрозділи:</div>
                            {dept.sub.map(unit => <div className={'ml-4'}>{unit}</div>)}
                        </div>}
                    </>}

                </div>
            ))}
            {/*{filteredDepts.length === 0 && (*/}
            {/*    <div className="text-center py-10 text-gray-500">*/}
            {/*        Підрозділів за вашим запитом не знайдено.*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    )
}