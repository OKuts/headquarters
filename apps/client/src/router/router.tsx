import {createBrowserRouter} from 'react-router'
import {AboutPage, AdminPage, Main, MainLayout, TasksPage, TodoPage, Work} from '../pages'
import {AuthForm} from '../components/navbar/AuthForm.tsx'
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
                    path: '/admin',
                    element: <AdminPage/>,
                },
                {
                    path: '/todo',
                    element: <TodoPage/>,
                },
                {
                    path: '/tasks',
                    element: <TasksPage/>,
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
