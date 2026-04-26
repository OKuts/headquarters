import {TasksClass} from '../repositories/tasksClass'
import { Request, Response } from 'express'

export const tasksGetApi = async (req: Request, res: Response) => {
    try {
        const result = await TasksClass.findAll()

        console.log('ok', result)
        return res.status(201).json({
            data: result
        })

    } catch (error) {
        console.error('Помилка в обробнику:', error)
        return res.status(500).json({
            data: null
        })
    }
}

