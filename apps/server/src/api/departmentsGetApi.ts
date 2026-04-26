import { Request, Response } from 'express'
import {DepartmentsClass} from '../repositories'

export const departmentsGetApi = async (req: Request, res: Response) => {
    try {
        const result = await DepartmentsClass.findAll()

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

