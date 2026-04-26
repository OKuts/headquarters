import {UsersClass} from '../repositories/usersClass' // ваш інстанс бази
import { Request, Response } from 'express'

export const registerUserApi = async (req: Request, res: Response) => {

    console.log(req.body)
    const {login, password} = req.body

    const {message, isLogin} =  await UsersClass.registerUser(login, password)

    return res.status(201).json({
        message,
        isLogin,
    })
}