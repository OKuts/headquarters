import {useAdminStore, useAuthStore} from '../../store'
import {LogOut, UserRoundPen} from 'lucide-react'
import {useNavigate} from 'react-router'
import {useState} from 'react'
import {ChangeRole} from '../workers'

export const AuthSection = () => {
    const {user, logout} = useAuthStore()
    const {setAdmin} = useAdminStore()
    const navigate = useNavigate()
    const [isChange, setIsChange] = useState<boolean>(false)

    const outHandler = () => {
        logout()
        setAdmin('')
    }

    const loginHandler = () => {
        if (!user) {
            navigate('auth')
        } else {
            navigate('/')
        }
    }

    return <>
        {user ? (
            <>
                {isChange && <ChangeRole onClose={()=> setIsChange(false)}/>}
                <div className="flex items-center gap-4">
                    {user && <div className="hidden flex-col items-end md:flex">
                        <div className={'flex justify-around'}>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{user?.login}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{user?.name}</span>
                    </div>}

                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        <UserRoundPen onClick={()=> setIsChange(true)} size={20} className="text-gray-600 dark:text-gray-300"/>
                    </div>

                    <button
                        onClick={outHandler}
                        className="group flex items-center gap-2 rounded-lg p-2 text-gray-500 hover:text-red-500 dark:text-gray-400"
                    >
                        <LogOut size={20}/>
                    </button>
                </div>
            </>
        ) : (
            <button
                onClick={loginHandler}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
                Увійти
            </button>
        )}
    </>
}