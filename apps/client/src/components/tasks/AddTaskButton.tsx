import {PlusCircle} from 'lucide-react'
import React from 'react'
import {useAuthStore} from '../../store'

type Props = {
    setIsAdd: (value: boolean) => void,
}

export const AddTaskButton: React.FC<Props> = ({setIsAdd}) => {
    const {user} = useAuthStore()

    return <div className="container flex mb-2">
        <div className={'flex items-end'}>
            {user && <h3 className={'ml-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white'}>
                {user.login}
            </h3>}
            <span className={'ml-2'}>- мої завдання</span>
            <PlusCircle onClick={() => setIsAdd(true)} className="text-blue-500 ml-2"/>
        </div>
    </div>
}