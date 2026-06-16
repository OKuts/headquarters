import { Request, Response } from 'express'
import {UsersClass} from '../../repositories'

export const userServerApi = async (req: Request, res: Response) => {

    console.log('User auth')
    console.log(req.body)
    const {name} = req.body


    const data =  name ? await UsersClass.registerUser(req.body) : await UsersClass.loginUser(req.body)

    return res.status(201).json({
        message: data?.message,
        isLogin: data?.isLogin,
        user: data?.user,
    })
}