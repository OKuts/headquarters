import {Request, Response} from 'express'
import {AdminClass} from '../../repositories'

export const isAdminControlApi = async (req: Request, res: Response) => {

    console.log('isAdminControl')
    const result = await AdminClass.isAdmin(req.body)

    return res.status(201).json({isAdmin: result})
}