import {useNavigation,} from 'react-router'
import {type JSX, useState} from 'react'
import {Admins} from '../components/logo'
import {DepartmentsList, InputEditDepartmentName} from '../components/department'
import {WatchSelect} from '../elements'
import {InputPersonName, PersonList} from '../components/person'
import {WorkersList} from '../components/workers'


export const AdminPage = () => {
    const navigation = useNavigation()
    const [add, setAdd] = useState<string>('')
    const [watch, setWatch] = useState<string>('all')

    if (navigation.state === 'loading') return null

    const inputMaps: Record<string, JSX.Element> = {
        units: <InputEditDepartmentName setAdd={setAdd}/>,
        persons: <InputPersonName setAdd={setAdd}/>,
    }

    const watchMaps: Record<string, JSX.Element> = {
        all: <DepartmentsList setAdd={setAdd} watch={watch}/>,
        units: <DepartmentsList setAdd={setAdd} watch={watch}/>,
        persons: <PersonList setAdd={setAdd} watch={watch}/>,
        workers: <WorkersList />,
    }

    return <div>
        <div className={'flex justify-between'}>
            <Admins/>
            <WatchSelect list={Object.keys(watchMaps)} setWatch={setWatch} watch={watch}/>
        </div>
        {inputMaps[add] || null}
        {watchMaps[watch] || null}
    </div>
}