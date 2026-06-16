import {ToggleThemeButton} from './ToggleThemeButton.tsx'
import {NavLink} from 'react-router'
import {AuthSection} from './AuthSection.tsx'
import {useAuthStore} from '../../store'
import money from '../../assets/branding-image-ua-clear-white.png'
import {nav} from '../../data'
import {linkMain} from '../../stylesFn/linkStyles.ts'

export const Navbar = () => {
    const {user} = useAuthStore()


    return (
        <nav
            className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md transition-colors dark:border-gray-800 dark:bg-gray-900/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* Логотип проєкту */}
                <div className="flex items-center gap-2">
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg  text-white font-bold">
                        <NavLink to={'/about'}>
                            <img src={money} alt=""/>
                        </NavLink>
                    </div>
                    <NavLink to={'/admin'}>
                        <span
                            className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Headquarters</span>
                    </NavLink>
                </div>

                <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4">
                    {user && nav.map(([to, name]: string[]) => (
                        <NavLink key={to} to={to} className={({isActive}) => linkMain(isActive)}>
                            {name}
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <ToggleThemeButton/>
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"/>
                    <AuthSection/>
                </div>
            </div>
        </nav>
    )
}

