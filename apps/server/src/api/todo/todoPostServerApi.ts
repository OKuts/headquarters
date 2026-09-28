import {TodoClass} from '../../repositories'
import { Request, Response } from 'express'
import {ObjectId} from 'mongodb'

export const todoPostServerApi = async (req: Request, res: Response) => {
    try {

        const {action, data, _id} = req.body

        const actions = {
            all: {
                method: TodoClass.findAll,
                arguments: new ObjectId(_id)
            },
            my: '',
            sub: '',
            data: {
                method: TodoClass.create,
                arguments: {...data, createdAt: new Date()}
            },
        }

          // 2. Виклик функції репозиторію для збереження в MongoDB
        const result = await actions[action].method(actions[action].arguments)

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

