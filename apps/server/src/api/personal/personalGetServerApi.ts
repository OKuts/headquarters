import {Request, Response} from 'express'
import {PersonalClass} from '../../repositories/personalClass'

export const personalGetServerApi = async (req: Request, res: Response) => {

    console.log('Personal get')
    const persons = await PersonalClass.all()

    return res.status(201).json(persons)
}