import { Request, Response } from 'express'
import {DepartmentsClass} from '../../repositories'
import {ObjectId} from 'mongodb'

export const departmentsPatchServerApi = async (req: Request, res: Response) => {
    try {
        const {_id, data, add} = req.body
        console.log('departmentPatchApi', _id, data, add)
        if (data) delete data._id
        const result = await DepartmentsClass.patch(new ObjectId(_id), data, add)
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

