import { Request, Response } from 'express'
import {DepartmentsClass} from '../../repositories'

export const departmentDeleteServerApi = async (req: Request, res: Response) => {
    try {
        const {_id, data} = req.body
        console.log(`DepartmentDeleteServerApi id ${_id}`)
        const result = await DepartmentsClass.delete(_id, data._id)

        console.log('...departmentDeleteApi')
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

