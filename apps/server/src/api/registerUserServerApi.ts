import {UsersClass} from '../repositories' // ваш інстанс бази
import { Request, Response } from 'express'

export const registerUserServerApi = async (req: Request, res: Response) => {

    console.log(req.body)

    const {message, isLogin} =  await UsersClass.registerUser(req.body)

    return res.status(201).json({
        message,
        isLogin,
    })
}