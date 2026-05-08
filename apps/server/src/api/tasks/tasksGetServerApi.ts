import {TasksClass} from '../../repositories'
import { Request, Response } from 'express'

export const tasksGetServerApi = async (req: Request, res: Response) => {
    try {
        console.log('tasksGetApi')
        const result = await TasksClass.findAll()
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

