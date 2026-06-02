import { Request, Response } from 'express'
import {PersonalClass} from '../../repositories/personalClass'

export const personalAddServerApi = async (req: Request, res: Response) => {

    console.log('Personal')
    console.log(req.body)
    const {message, person} =  await PersonalClass.create(req.body)

    return res.status(201).json({
        message,
        person
    })
}