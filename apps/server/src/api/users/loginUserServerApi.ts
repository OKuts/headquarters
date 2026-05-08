import {UsersClass} from '../../repositories' // ваш інстанс бази
import {Request, Response} from 'express'

export const loginUserServerApi = async (req: Request, res: Response) => {

    console.log('login user')
    const {login, password} = req.body

    if (!login || !password) {
        return res.status(201).json({
            message: 'Login failed',
            isLogin: false,
            user: null
        })

    }
    const {message, isLogin, user} = await UsersClass.loginUser(login, password)

    return res.status(201).json({
        message,
        isLogin,
        user
    })
}