import {mongoConnection} from '../utils/mongodb'
import {IDepartment, IDepartmentName} from '@headquarters/shared'
import {ObjectId, UpdateFilter} from 'mongodb'

export class DepartmentsClass {
    private static collectionName = 'departments'

    static async findAll(): Promise<IDepartment[]> {
        const db = await mongoConnection.getDb()
        return db.collection<IDepartment>(this.collectionName).find().toArray()
    }

    static async findOne(_id: ObjectId) {
        const db = await mongoConnection.getDb()
        return await db.collection(this.collectionName).findOne({_id})
    }

    static async deleteSub(key: ObjectId, _id: ObjectId) {
        const db = await mongoConnection.getDb()
        return await db.collection(this.collectionName).findOneAndUpdate(
            {_id: key},
            {$pull: {sub: {_id}} as UpdateFilter<IDepartment>},
            {returnDocument: 'after'})
    }

    static async delete(key: string, _id: string) {
        const db = await mongoConnection.getDb()
        const sub = await DepartmentsClass.deleteSub(new ObjectId(_id), new ObjectId(key))
        const cur = await db.collection(this.collectionName).deleteOne({_id: new ObjectId(key)})
        return [cur, sub]
    }

    static async patch(_id: string, data: IDepartment, action: {[key: string]: string}) {
        const db = await mongoConnection.getDb()
        const [key, value] = Object.entries(action)[0]
        const curData = await DepartmentsClass.findOne(new ObjectId(_id))

        switch (key) {
            case 'main': {
                if (value === 'update') {
                    const main = curData && curData.main
                        ? await DepartmentsClass.deleteSub(new ObjectId(curData.main), new ObjectId(_id))
                        : null
                    const cur = await db.collection(this.collectionName).findOneAndUpdate(
                        {_id: new ObjectId(_id)},
                        {$set: {main: new ObjectId(data._id)}},
                        {upsert: true, returnDocument: 'after'})
                    const sub = await db.collection(this.collectionName).findOneAndUpdate(
                        {_id: new ObjectId(data._id)},
                        {$addToSet: {sub: {_id: new ObjectId(_id)}}},
                        {returnDocument: 'after', upsert: true})
                    return [cur, sub, main]
                } else if (value === 'delete') {
                    const cur = await db.collection(this.collectionName).findOneAndUpdate(
                        {_id: new ObjectId(_id)},
                        {$unset: {main: ''}},
                        {returnDocument: 'after'})
                    const sub = await DepartmentsClass.deleteSub(new ObjectId(data._id), new ObjectId(_id))
                    return [cur, sub]
                }
            }
        }
    }

    static async create(data: IDepartmentName) {

        console.log('create', data)
        const db = await mongoConnection.getDb()
        return await db.collection(this.collectionName).findOneAndUpdate(
            {department: data.department},
            {$setOnInsert: {department: data.department}},
            {upsert: true, returnDocument: 'after'}
        )
    }
}