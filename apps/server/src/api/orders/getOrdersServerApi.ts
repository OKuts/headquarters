import {Request, Response} from 'express'
import {OrdersClass} from '../../repositories/ordersClass'

export const getOrdersServerApi = async (req: Request, res: Response) => {
    try {

        console.log('Get orders...')

        const result = await OrdersClass.findAll()

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