import { Request, Response } from 'express'
import {DepartmentsClass} from '../../repositories'
import {ObjectId} from 'mongodb'

export const departmentDeleteServerApi = async (req: Request, res: Response) => {
    try {
        const id = req.body

        console.log(`DepartmentDeleteServerApi id ${id}`)
        const result = await DepartmentsClass.delete({_id: new ObjectId(req.body._id)})

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

