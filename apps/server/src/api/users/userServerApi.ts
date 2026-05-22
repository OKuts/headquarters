import { Request, Response } from 'express'
import {UsersClass} from '../../repositories'

export const userServerApi = async (req: Request, res: Response) => {

    console.log('User auth')
    console.log(req.body)
    const {name} = req.body
    const {message, isLogin, user} =  name ? await UsersClass.registerUser(req.body) : await UsersClass.loginUser(req.body)

    return res.status(201).json({
        message,
        isLogin,
        user
    })
}