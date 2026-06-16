import {Outlet} from 'react-router'
import {Navbar} from '../components/navbar/Navbar.tsx'
import {useEffect, useMemo} from 'react'
import {useAuthStore, useDepartmentsStore} from '../store'
import {departmentsClientApi} from '../api'


export const MainLayout = () => {
    const {initDepartments} = useDepartmentsStore()
    const {user} = useAuthStore()

    const departmentData = useMemo(() =>
            user && typeof user.department !== 'string' ?
                [user.department.department, user.role] : ['', '']
        , [user])

    useEffect(() => {
        departmentsClientApi({_id: '', method: 'GET'}).then(data => {
            initDepartments(data.data)
        })
    }, [initDepartments])

    return (
        <div className=" min-h-screen h-screen overflow-y-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white transition-colors duration-300">
            {/*{navigation.state === 'loading' && <p>Завантаження...</p>}*/}
            <Navbar/>
            <main className="mx-auto max-w-7xl ">
                {user && <>
                    <div className={'flex justify-end'}>
                        <span className={'mr-2'}>{`${departmentData[0]}:`}</span>
                        <span className={'text-blue-500'}>{departmentData[1].toLowerCase()}</span>
                    </div>
                </>}
                <Outlet/>
            </main>
        </div>
    )
}