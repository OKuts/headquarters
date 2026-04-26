import { mongoConnection } from '../utils/mongodb'
import { IDepartment } from '@headquarters/shared'

export class DepartmentsClass {
    private static collectionName = 'departments'

    static async findAll(): Promise<IDepartment[]> {
        const db = await mongoConnection.getDb()
        return db.collection<IDepartment>(this.collectionName).find().toArray()
    }
}