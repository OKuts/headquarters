import { mongoConnection } from '../utils/mongodb'
import { ITask } from '@headquarters/shared'
import {ObjectId} from 'mongodb'

export class TodoClass {
    private static collectionName = 'todo'

    static async findAll(_id: ObjectId): Promise<ITask[]> {
        const db = await mongoConnection.getDb()


        return db.collection<ITask>(this.collectionName).find().toArray()
    }

    static async create(task: ITask): Promise<void> {



        const db = await mongoConnection.getDb()
        await db.collection<ITask>(this.collectionName).insertOne(task)
    }
}