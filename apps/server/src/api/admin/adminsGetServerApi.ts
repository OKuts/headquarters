import { Request, Response } from 'express'
import {AdminClass} from '../../repositories'


export const adminsGetServerApi = async (req: Request, res: Response) => {
    try {
        const result = await AdminClass.all()

        console.log('adminsGetApi')
        return res.status(201).json({
            data: result
        })

    } catch (error) {
        console.error('Помилка в обробнику:', error)
        return res.status(500).json({
            data: null
        })
    }
}

