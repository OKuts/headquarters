import { mongoConnection } from '../utils/mongodb'
import { ITask } from '@headquarters/shared'

export class TasksClass {
    private static collectionName = 'tasks'

    static async findAll(): Promise<ITask[]> {
        const db = await mongoConnection.getDb()
        return db.collection<ITask>(this.collectionName).find().toArray()
    }

    static async create(task: ITask): Promise<void> {
        const db = await mongoConnection.getDb()
        await db.collection<ITask>(this.collectionName).insertOne(task)
    }
}