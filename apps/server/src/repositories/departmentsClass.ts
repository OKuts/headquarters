import { mongoConnection } from '../utils/mongodb'
import { IDepartment } from '@headquarters/shared'
import {ObjectId, UpdateResult} from 'mongodb'

export class DepartmentsClass {
    private static collectionName = 'departments'

    static async findAll(): Promise<IDepartment[]> {
        const db = await mongoConnection.getDb()
        return db.collection<IDepartment>(this.collectionName).find().toArray()
    }

    static async findId(department: string): Promise<ObjectId | null> {
        const db = await mongoConnection.getDb()
        const data = await  db.collection<IDepartment>(this.collectionName).findOne({ department })
        return data?._id || null
    }

    static async findName(_id: ObjectId ): Promise<IDepartment | null> {
        const db = await mongoConnection.getDb()
        return await  db.collection<IDepartment>(this.collectionName).findOne({ _id })
    }

    static async create(data: IDepartment): Promise<UpdateResult<IDepartment>> {
        const db = await mongoConnection.getDb()
        return await db.collection<IDepartment>(this.collectionName).updateOne(
            {department: data.department},
            {
                $setOnInsert: {department: data.department}
            },
            {upsert: true}
        )
    }
}