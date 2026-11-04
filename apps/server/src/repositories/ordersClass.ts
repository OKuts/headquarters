import {mongoConnection} from '../utils/mongodb'
import {DocumentEmpty, IOrderDataItem, IOrderReturn} from '@headquarters/shared/models/OrderModel'
import {InsertOneResult, ObjectId} from 'mongodb'

export class OrdersClass {
    private static collectionName = 'orders'

    static async findAll(): Promise<IOrderReturn[]> {
        const db = await mongoConnection.getDb()
        return db.collection<IOrderReturn>(this.collectionName).find().toArray()
    }

    static async changeUnits(_id: string, unitsTop: Document | DocumentEmpty | null, unitsDown: Document | DocumentEmpty | null): Promise<IOrderReturn[]> {
        const db = await mongoConnection.getDb()
        if (unitsTop) {
            console.log(unitsTop)
            await db.collection<IOrderReturn>(this.collectionName).updateOne({_id: new ObjectId(_id)}, {$set: {unitsTop}})
        } else if (unitsDown) {
            console.log(unitsDown)
            await db.collection<IOrderReturn>(this.collectionName).updateOne({_id: new ObjectId(_id)}, {$set: {unitsDown}})
        }
        return await OrdersClass.findAll()
    }

    static async create(data: IOrderDataItem): Promise<InsertOneResult<Document>> {
        console.log('create', data)
        const db = await mongoConnection.getDb()
        return await db.collection(this.collectionName).insertOne({
            ...data,
            createdAt: new Date().toISOString().slice(0, 10)
        })
    }
}