import {Outlet, useNavigation} from "react-router";
import {NavMain} from "../router/nav/NavMain.tsx";

export const MainLayout = () => {
    const navigation = useNavigation();

    return (
        <div className=" min-h-screen h-screen overflow-y-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white transition-colors duration-300">
            {navigation.state === "loading" && <p>Завантаження...</p>}
            <NavMain/>
            <main className="mx-auto max-w-7xl p-6 ">
                <Outlet/>
            </main>
        </div>
    )
}