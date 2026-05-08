import {Request, Response} from 'express'
import {AdminClass} from '../../repositories/adminClass'

export const isAdminControlApi = async (req: Request, res: Response) => {

    console.log('isAdminControl')
    const {password} = req.body

    if (!password) {
        return res.status(201).json({isAdmin: false})
    }
    const result = await AdminClass.isAdmin(password)

    return res.status(201).json({isAdmin: result})
}