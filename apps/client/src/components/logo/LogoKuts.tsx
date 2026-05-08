import kuts from '../../assets/kuts.svg'
import {useState} from 'react'
import {PasswordConfirm} from './PasswordConfirm.tsx'
import {PlusCircle} from 'lucide-react'

type Props = {
    setIsAdd: (value: boolean) => void,
    setIsAdmin: (value: boolean) => void,
    isAdmin: boolean,
}

export const LogoKuts= ({setIsAdmin, isAdmin, setIsAdd}: Props) => {
    const [into, setInto] = useState<boolean>(false)


    return <>
        <div className="container flex items-center mb-2" onClick={(() => setInto(!into))}>
            <img src={kuts} alt="Oleksandr Kuts" className={'h-20 w-20'}/>
            <div>
                <h3 className={'ml-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white'}>Oleksandr
                    Kuts
                    {isAdmin && <span className={'text-blue-600'}>
                         {' (admin)'}
                    </span>}
                </h3>
            </div>
        </div>
        {into && !isAdmin && <PasswordConfirm onSuccess={setIsAdmin} onCancel={setInto}/>}
        {isAdmin && <>
            <div className={'flex'} onClick={() => setIsAdd(true)}>
                <PlusCircle/>
                <span className={'text-xl ml-2 font-bold tracking-tight text-gray-900 dark:text-white'}>Add unit</span>
            </div>
        </>}
    </>
}