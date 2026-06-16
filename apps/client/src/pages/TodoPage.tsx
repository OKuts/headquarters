import {useNavigation} from 'react-router'
import {type JSX, useState} from 'react'
import {WatchSelect} from '../elements'
import {PlusCircle} from 'lucide-react'
import {CreateTaskForm} from '../components/tasks'

export const TodoPage = () => {
    const navigation = useNavigation()
    const [add, setAdd] = useState<string>('')
    const [isAdd, setIsAdd] = useState<boolean>(false)
    const [watch, setWatch] = useState<string>('all')

    if (navigation.state === 'loading') return null

    const inputMaps: Record<string, JSX.Element> = {
        all: <div>all</div>,
        my: <div>my</div>,
        sub: <div>sub</div>,
    }

    const watchMaps: Record<string, JSX.Element> = {
        all: <div>All</div>,
        my: <div>My</div>,
        sub: <div>Sub</div>,
    }



    return <div>
        <div className={'flex justify-end'}>
            <WatchSelect list={Object.keys(watchMaps)} setWatch={setWatch} watch={watch}/>
        </div>
        <PlusCircle onClick={() => setIsAdd(true)} className="text-blue-500 ml-2 hover:cursor-pointer"/>
        {isAdd && <CreateTaskForm setIsAdd={setIsAdd}/>}
        {inputMaps[add] || null}
        {watchMaps[watch] || null}
    </div>
}