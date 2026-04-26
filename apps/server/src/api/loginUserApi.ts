import {UsersClass} from '../repositories/usersClass' // ваш інстанс бази
import { Request, Response } from 'express'

export const loginUserApi = async (req: Request, res: Response) => {

    console.log('login user', req.body)
    const {login, password} = req.body

    if (!login || !password) {
        return res.status(201).json({
        message: 'Login failed',
        isLogin: false,
    })

    }
    const {message, isLogin} =  await UsersClass.loginUser(login, password)

    return res.status(201).json({
        message,
        isLogin,
    })
}