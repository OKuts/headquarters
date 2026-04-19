import {createBrowserRouter} from 'react-router'
import {AboutPage, Main, MainLayout, Work} from '../pages'
import {taskLoader} from './loaders/taskLoader.ts'


export const router = createBrowserRouter([
        {
            path: '/',
            element: <MainLayout/>, // Головний компонент
            children: [
                {
                    path: '/about',
                    element: <AboutPage/>,
                    loader: taskLoader,
                },
                {
                    path: '/main',
                    element: <Main/>,
                    // loader: healthLoader, // Прив'язуємо лоадер до маршруту
                    errorElement: <div>Ой! Користувача не існує.</div>, // Обробка помилок
                },
                {
                    path: '/work',
                    element: <Work/>,
                    errorElement: <div>Ой! Користувача не існує.</div>, // Обробка помилок
                },
            ]
        }
    ])
