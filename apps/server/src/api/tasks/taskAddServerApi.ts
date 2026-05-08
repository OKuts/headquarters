import {TasksClass} from '../../repositories/tasksClass'
import { Request, Response } from 'express'

export const taskAddServerApi = async (req: Request, res: Response) => {
    try {

          // 2. Виклик функції репозиторію для збереження в MongoDB
        const result = await TasksClass.create({...req.body, createdAt: new Date()})

        // 3. Відповідь клієнту
        return res.status(201).json({
            success: true,
            data: result
        })

    } catch (error) {
        console.error('Помилка в обробнику add-task:', error)
        return res.status(500).json({
            success: false,
            message: 'Внутрішня помилка сервера'
        })
    }
}

