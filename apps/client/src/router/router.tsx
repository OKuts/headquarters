import {createBrowserRouter} from 'react-router'
import {AboutPage, Main, MainLayout, TodoPage, Work} from '../pages'
import {AuthForm} from '../components/total/navbar/AuthForm.tsx'
import {departmentsLoader, taskLoader} from './loaders'

export const router = createBrowserRouter([
        {
            path: '/',
            element: <MainLayout/>, // Головний компонент
            children: [
                {
                    path: '/about',
                    element: <AboutPage/>,
                },
                {
                    path: '/todo',
                    element: <TodoPage/>,
                    loader: taskLoader,
                },
                {
                    path: '/main',
                    element: <Main/>,
                    errorElement: <div>Ой! Користувача не існує.</div>, // Обробка помилок
                },
                {
                    path: '/work',
                    element: <Work/>,
                    errorElement: <div>Ой! Користувача не існує.</div>, // Обробка помилок
                },
                {
                    path: '/auth',
                    element: <AuthForm/>,
                    loader: departmentsLoader
                },
            ]
        }
    ])
