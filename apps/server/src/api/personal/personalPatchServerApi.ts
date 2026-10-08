import {Request, Response} from 'express'
import {PersonalClass} from '../../repositories/personalClass'
import {UsersClass} from '../../repositories'

export const personalPatchServerApi = async (req: Request, res: Response) => {

    console.log('Personal patch', req.body)
    const {_id, access, phone} = req.body

    if (!access) UsersClass.removeByPhone(phone)

    const persons = await PersonalClass.patch(_id, access)

    return res.status(201).json(persons)
}