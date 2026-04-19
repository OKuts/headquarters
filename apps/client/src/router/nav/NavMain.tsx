import {NavLink} from "react-router";
import {ThemeToggle} from "../../components/total/TheameToggle.tsx";
import {LogOut, User} from "lucide-react";
import {useState} from "react";

const nav = [
    ['/main', 'Main'],
    ['/work', 'Work'],
]


export const NavMain = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const linkClasses = ({isActive}: { isActive: boolean }) =>
        `px-4 py-2 rounded-lg transition-all duration-200 ${
            isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
        }`;


    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white backdrop-blur-md">
            <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
                    <div className="h-8 w-8 rounded-bg flex items-center justify-center">
                        <NavLink to={'/about'}>
                            <img src={"https://icsbpc.mod.gov.ua/logon_ui_resources/layout/branding-image.jpg"} alt=""/>
                        </NavLink>
                    </div>
                    <span>Headquarters</span>
                </div>
                <div className="flex items-center gap-4">
                    {nav.map(([to, name]) => <NavLink key={to} className={linkClasses} to={to}>{name}</NavLink>)}
                </div>
                <div className="flex items-center gap-8">
                    <div>
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-3">
                                <div
                                    className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                    <User size={18}/>
                                </div>
                                <button
                                    onClick={() => setIsLoggedIn(false)}
                                    className="flex items-center text-sm font-medium text-red-500 hover:text-red-600"
                                >
                                    <LogOut size={18} className="mr-1"/> Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsLoggedIn(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                Login
                            </button>
                        )}
                    </div>
                    <ThemeToggle/>
                </div>
            </div>
        </nav>
    )
}