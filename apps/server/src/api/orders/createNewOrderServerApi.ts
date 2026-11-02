import {Request, Response} from 'express'
import {OrdersClass} from '../../repositories/ordersClass'

export const createNewOrderServerApi = async (req: Request, res: Response) => {
    try {

        console.log('Creating new order server...')
        console.log(req.method)

        const result = req.method === 'GET' ? await OrdersClass.findAll() : await OrdersClass.create(req.body)

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