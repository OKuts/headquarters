import React from 'react'
import {ToggleThemeButton} from './ToggleThemeButton.tsx'
import {NavLink} from 'react-router'
import {AuthSection} from './AuthSection.tsx'
import {useAuthStore} from '../../../store'
import money from '../../../assets/branding-image-ua-clear-white.png'
import {nav} from '../../../data'

const Navbar: React.FC = () => {
    // Вибираємо стан із типізованих сторів
    const {isLoggedIn} = useAuthStore()

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
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Headquarters</span>
                    </NavLink>
                </div>

                <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4">
                    {isLoggedIn && <div className="flex items-center gap-4 ">
                        {nav.map(([to, name]) => <NavLink
                            className="px-3 py-1 rounded-md transition-all duration-200
             hover:bg-gray-100 dark:hover:bg-gray-800
             text-gray-700 dark:text-gray-300
             hover:text-blue-500 "
                            key={to} to={to}>{name}</NavLink>)}
                    </div>}
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

export default Navbar