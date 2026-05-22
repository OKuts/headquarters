import {useNavigation,} from 'react-router'
import {type JSX, useState} from 'react'
import {Admins} from '../components/logo'
import {DepartmentsList, InputEditDepartmentName} from '../components/department'
import {WatchSelect} from '../elements'
import {InputPersonName, PersonList} from '../components/person'


export const AdminPage = () => {
    const navigation = useNavigation()
    const [add, setAdd] = useState<string>('')
    const [watch, setWatch] = useState<string>('all')

    if (navigation.state === 'loading') return null

    const inputMaps: Record<string, JSX.Element> = {
        unit: <InputEditDepartmentName setAdd={setAdd}/>,
        person: <InputPersonName setAdd={setAdd}/>,
    }

    const watchMaps: Record<string, JSX.Element> = {
        all: <></>,
        unit: <DepartmentsList setAdd={setAdd} watch={watch}/>,
        person: <PersonList setAdd={setAdd} watch={watch}/>,
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