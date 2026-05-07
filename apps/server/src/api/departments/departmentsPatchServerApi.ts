import { Request, Response } from 'express'
import {DepartmentsClass} from '../../repositories'
import {ObjectId} from 'mongodb'

export const departmentDeleteServerApi = async (req: Request, res: Response) => {
    try {
        const {_id} = req.body
        const result = await DepartmentsClass.delete(new ObjectId(_id))

        console.log('departmentDeleteApi')
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

