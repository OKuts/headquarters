import { Request, Response } from 'express'
import {DepartmentsClass} from '../repositories'

export const departmentsGetServerApi = async (req: Request, res: Response) => {
    try {
        const result = await DepartmentsClass.findAll()

        console.log('departmentsGetApi')
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

