import { Request, Response } from 'express'
import {DepartmentsClass} from '../../repositories'

export const departmentDataServerApi = async (req: Request, res: Response) => {
    try {
        const {_id, data} = req.body
        console.log('------------------------------------departmentDataServerApi')
        console.log(req.body)
        const result = _id
            ? await DepartmentsClass.findOne(_id)
            : await DepartmentsClass.create(data)

        console.log('---------------------------departmentCreateApi')
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

