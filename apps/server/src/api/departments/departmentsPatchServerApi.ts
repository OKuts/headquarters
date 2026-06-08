import { Request, Response } from 'express'
import {DepartmentsClass} from '../../repositories'
import {ObjectId} from 'mongodb'

export const departmentsPatchServerApi = async (req: Request, res: Response) => {
    try {
        const {_id, data, action} = req.body

        const result = await DepartmentsClass.patch(_id, data, action)
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

