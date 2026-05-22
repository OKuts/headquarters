import {Outlet, useNavigation} from 'react-router'
import Navbar from '../components/total/navbar/Navbar.tsx'
import {useEffect} from 'react'
import {useDepartmentsStore} from '../store'
import {departmentsClientApi} from '../api'


export const MainLayout = () => {
    const navigation = useNavigation()
    const {saveDepartments} = useDepartmentsStore()

    useEffect(() => {
        departmentsClientApi({_id: '', method: 'GET'}).then(data => {
            saveDepartments(data.data)
        })
    }, [saveDepartments])

    return (
        <div className=" min-h-screen h-screen overflow-y-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white transition-colors duration-300">
            {navigation.state === 'loading' && <p>Завантаження...</p>}
            <Navbar/>
            <main className="mx-auto max-w-7xl p-6 ">
                <Outlet/>
            </main>
        </div>
    )
}