import { Request, Response } from 'express'
import {DepartmentsClass} from '../repositories'

export const departmentCreateServerApi = async (req: Request, res: Response) => {
    try {

        console.log(req.body)
        const result = await DepartmentsClass.create(req.body)

        console.log('departmentCreateApi')
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

