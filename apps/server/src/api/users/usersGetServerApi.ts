import { Request, Response } from 'express'
import {UsersClass} from '../../repositories'

export const usersGetServerApi = async (req: Request, res: Response) => {

    console.log('usersGetServerApi')

    const users =   await UsersClass.allAccess()
    return res.status(201).json(users)
}