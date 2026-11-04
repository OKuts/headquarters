import {Request, Response} from 'express'
import {OrdersClass} from '../../repositories/ordersClass'

export const changeOrderServerApi = async (req: Request, res: Response) => {
    try {

        console.log('Change order server...')

        const {_id, unitsTop, unitsDown} = req.body
        console.log(req.body)

        const result = await OrdersClass.changeUnits(_id, unitsTop, unitsDown)

        return res.status(201).json({
            // data: result
            data: []
        })

    } catch (error) {
        console.error('Помилка в обробнику:', error)
        return res.status(500).json({
            data: null
        })
    }
}