import {useEffect, useState} from 'react'
import {PasswordConfirm} from './PasswordConfirm.tsx'
import {useAdminStore} from '../../store'
import {adminsClientApi} from '../../api'
import type {IAdmin} from '@headquarters/shared/models/AdminsModel'
import {Check} from 'lucide-react'

export const Admins = () => {
    const [into, setInto] = useState<IAdmin | null>(null)
    const {admin, setAdmin} = useAdminStore()
    const [admins, setAdmins] = useState<IAdmin[] | []>([])

    const handler = async (admin: IAdmin) => {
        setAdmin('')
        setInto(admin)
    }

    useEffect(() => {
        adminsClientApi()
            .then(data => data.json())
            .then(data => setAdmins(data.data))
    }, [])

    return <>
        <div className={'flex'}>
            <div className={'min-w-35'}>Адміністратори:</div>
            {admins.map(el => <div key={el._id} className="flex mb-2 min-w-50"
                                   onClick={(() => handler(el))}>

                <div className={'ml-2 text-l flex font-bold tracking-tight text-gray-900 dark:text-white'}>
                    {el.name}
                    {el._id === (into && into._id) ? <Check className={'ml-2 text-green-500'}/> : ''}
                </div>
            </div>)}
        </div>

        {into && !admin && <PasswordConfirm into={into} onSuccess={setAdmin} onCancel={setInto}/>}
    </>
}