import {useNavigation,} from 'react-router'
import {type JSX, useState} from 'react'
import {Admins} from '../components/logo'
import {DepartmentsList, InputEditDepartmentName} from '../components/department'
import {SearchInput, WatchSelect} from '../elements'
import {InputPersonName, PersonList} from '../components/person'
import {WorkersList} from '../components/workers'
import {Losses} from '../components/losses'
import {useAdminStore} from '../store'
import {Money} from '../components/money/Money.tsx'
import {Orders, TelegramNavbar} from '../components/orders'
import {Prop} from '../components/properties/Prop.tsx'

export const AdminPage = () => {
    const navigation = useNavigation()
    const [add, setAdd] = useState<string>('')
    const [watch, setWatch] = useState<string>('all')
    const {admin} = useAdminStore()

    console.log(admin)

    if (navigation.state === 'loading') return null

    const inputMaps: Record<string, JSX.Element> = {
        units: <InputEditDepartmentName setAdd={setAdd}/>,
        persons: <InputPersonName setAdd={setAdd}/>,
        orders: <TelegramNavbar setAdd={setAdd}/>,
    }

    const watchMaps: Record<string, JSX.Element> = {
        all: <DepartmentsList setAdd={setAdd} watch={watch}/>,
        units: <DepartmentsList setAdd={setAdd} watch={watch}/>,
        persons: <PersonList setAdd={setAdd} watch={watch}/>,
        workers: <WorkersList/>,
        losses: <Losses/>,
        money: <Money/>,
        orders: <Orders setAdd={setAdd} watch={watch}/>,
        property: <Prop/>,
    }

    return <>
        <div className='w-screen ml-[calc(50%-50vw)] sticky z-40 top-16 bg-slate-50 dark:bg-slate-800'>
            <div className={'container mx-auto max-w-7xl flex justify-between bg-slate-50 dark:bg-slate-800 pt-2 pb-2'}>
                <Admins/>
                <WatchSelect
                    list={admin ? Object.keys(watchMaps) : []}
                    setWatch={setWatch}
                    watch={watch}/>
                <SearchInput/>
            </div>
        </div>
        {admin && watchMaps[watch] || null}
        {inputMaps[add] || null}
    </>
}