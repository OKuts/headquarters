import {useNavigation,} from 'react-router'
import {type JSX, useState} from 'react'
import {Admins} from '../components/logo'
import {DepartmentsList, InputEditDepartmentName} from '../components/department'
import {WatchSelect} from '../elements'
import {InputPersonName, PersonList} from '../components/person'
import {WorkersList} from '../components/workers'
import {Losses} from '../components/losses'
import {useAdminStore} from '../store'
import {Money} from '../components/money/Money.tsx'
import {Orders} from '../components/orders'
import {TelegramNavbar} from '../components/orders'

export const AdminPage = () => {
    const navigation = useNavigation()
    const [add, setAdd] = useState<string>('')
    const [watch, setWatch] = useState<string>('all')
    const {admin} = useAdminStore()

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
        workers: <WorkersList />,
        losses: <Losses />,
        money: <Money />,
        orders: <Orders setAdd={setAdd} watch={watch}/>,
    }

    return <div>
        <div className={'flex justify-between'}>
            <Admins/>
            <WatchSelect
                list={admin ? Object.keys(watchMaps) : Object.keys(watchMaps).slice(0,-3)}
                setWatch={setWatch}
                watch={watch}/>
        </div>
        {watchMaps[watch] || null}
        {inputMaps[add] || null}
    </div>
}