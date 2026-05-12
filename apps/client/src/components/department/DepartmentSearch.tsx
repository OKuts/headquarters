import {Search} from 'lucide-react'

type Props = {
    setSearchTerm: (value: string) => void
}

export const DepartmentSearch = ({setSearchTerm}: Props) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-400">Підрозділи</h2>

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



    )
}