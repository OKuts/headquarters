import {mongoConnection} from '../utils/mongodb'
import {IOrderDataItem, IOrderReturn} from '@headquarters/shared/models/OrderModel'
import {InsertOneResult} from 'mongodb'

export class OrdersClass {
    private static collectionName = 'orders'

    static async findAll(): Promise<IOrderReturn[]> {
        const db = await mongoConnection.getDb()
        return db.collection<IOrderReturn>(this.collectionName).find().toArray()
    }
    //
    // static async findOne(_id: ObjectId) {
    //     const db = await mongoConnection.getDb()
    //     return await db.collection(this.collectionName).findOne({_id})
    // }

    static async create(data: IOrderDataItem): Promise<InsertOneResult<Document>> {
        console.log('create', data)
        const db = await mongoConnection.getDb()
        return await db.collection(this.collectionName).insertOne({...data, createdAt: new Date().toISOString().slice(0, 10)})
    }
}