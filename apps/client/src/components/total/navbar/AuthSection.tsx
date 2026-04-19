import {useAuthStore} from '../../../store/useAuthStore.ts'
import {LogOut, User} from 'lucide-react'
import {UserRole} from '@headquarters/shared'

export const AuthSection = () => {
    const {user, isLoggedIn, logout, login} = useAuthStore()

    return <>
        {isLoggedIn && user ? (
            <div className="flex items-center gap-4">
                <div className="hidden flex-col items-end md:flex">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                  {user.role}
                </span>
                </div>

                <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <User size={20} className="text-gray-600 dark:text-gray-300"/>
                </div>

                <button
                    onClick={logout}
                    className="group flex items-center gap-2 rounded-lg p-2 text-gray-500 hover:text-red-500 dark:text-gray-400"
                >
                    <LogOut size={20}/>
                </button>
            </div>
        ) : (
            <button
                onClick={() => login({id: '1', name: 'Адміністратор', role: UserRole.ADMIN, email: 'admin@hq.ua'})}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
                Увійти
            </button>
        )}
    </>
}