import {useNavigation} from 'react-router'
import {type JSX, useEffect, useMemo, useState} from 'react'
import {WatchSelect} from '../elements'
import {PlusCircle} from 'lucide-react'
import {CreateTaskForm} from '../components/tasks'
import {useAuthStore} from '../store'
import {ERoles} from '@headquarters/shared/models/UserModel.ts'
import {todoClientApi} from '../api/todoClientApi.ts'

const watchMaps: Record<string, JSX.Element> = {
    all: <div>All</div>,
    my: <div>My</div>,
    sub: <div>Sub</div>,
}

export const TodoPage = () => {
    const {user} = useAuthStore()
    const navigation = useNavigation()
    const [add, setAdd] = useState<string>('')
    const [isAdd, setIsAdd] = useState<boolean>(false)
    const [watch, setWatch] = useState<string>('all')

    const selectList = useMemo(() => user?.role === ERoles.USER
            ? Object.keys(watchMaps).slice(0, -1) : Object.keys(watchMaps)
        , [user?.role])

    useEffect(() => {
        if (user) {
            todoClientApi({method: 'POST', _id: user._id, action: 'all'})
                .then(data => console.log(data))
        }
    }, [user])

    if (navigation.state === 'loading') return null

    console.log('add', add)
    console.log('watch', watch)

    return <>
        {user && <div>
            <div className={'flex justify-end'}>
                <WatchSelect list={selectList} setWatch={setWatch} watch={watch}/>
            </div>

            {watch !== 'all' &&
                <PlusCircle onClick={() => setIsAdd(true)} className="text-blue-500 ml-2 hover:cursor-pointer"/>}
            {isAdd && <CreateTaskForm setIsAdd={setIsAdd}/>}
            {watchMaps[watch] || null}
        </div>}
    </>
}