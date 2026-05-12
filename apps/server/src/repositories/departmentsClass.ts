import {mongoConnection} from '../utils/mongodb'
import {IAddParams, IDepartment, IDepartmentUnit, IId} from '@headquarters/shared'
import {DeleteResult, ObjectId, UpdateFilter} from 'mongodb'

export class DepartmentsClass {
    private static collectionName = 'departments'

    static async findAll(): Promise<IDepartment[]> {
        const db = await mongoConnection.getDb()
        return db.collection<IDepartment>(this.collectionName).find().toArray()
    }

    static async findId(department: string): Promise<IId | null> {
        const db = await mongoConnection.getDb()
        const data = await db.collection<IDepartment>(this.collectionName).findOne({department})
        return data?._id || null
    }

    static async findOne(_id: string): Promise<IDepartment | null> {
        const db = await mongoConnection.getDb()
        return await db.collection<IDepartment>(this.collectionName).findOne({_id: new ObjectId(_id)})
    }

    static async delete(_id: ObjectId): Promise<DeleteResult> {
        const db = await mongoConnection.getDb()
        return await db.collection<IDepartment>(this.collectionName).deleteOne({_id})
    }

    static async patch(_id: ObjectId, data: IDepartmentUnit, add: IAddParams) {
        const db = await mongoConnection.getDb()
        const [key, value] = add ? Object.entries(add)[0] : ['', '']

        if (data && data.sub) {
            data.sub.forEach((el,i) => {
                const [, value] = Object.entries(el)[0]
                data.sub[i]._id = new ObjectId(value)

            })
        }
        if (data && data.main) data.main._id = new ObjectId(data.main._id)

        switch (key) {
            case 'main':
                return db.collection(this.collectionName).findOneAndUpdate(
                    {_id: _id}, {$unset: {[key]: ''}}, {returnDocument: 'after'})
            case 'sub':
                return db.collection(this.collectionName).findOneAndUpdate(
                    {_id},
                    {$pull: {sub: {_id: new ObjectId(value)}} as UpdateFilter<IDepartment>},
                    {returnDocument: 'after'})
            default:
                return db.collection(this.collectionName).findOneAndUpdate(
                    {_id}, {$set: {...data}}, {returnDocument: 'after'})
        }
    }

    static async create(data: IDepartment) {
        const db = await mongoConnection.getDb()

        return await db.collection<IDepartment>(this.collectionName).findOneAndUpdate(
            {department: data.department},
            {$setOnInsert: {department: data.department}},
            {upsert: true, returnDocument: 'after'}
        )
    }
}