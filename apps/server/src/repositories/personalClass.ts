import {mongoConnection} from '../utils/mongodb'
import {type IPersonData, IPerson} from '@headquarters/shared/models/PersonModel'
import {ObjectId} from 'mongodb'

export class PersonalClass {
    private static collectionName = 'personal'

    static async create(data: IPersonData) {
        const db = await mongoConnection.getDb()
        const result = await db.collection(this.collectionName).findOne({phone: data.phone})

        if (!result) {
            const person = await db.collection(this.collectionName).insertOne({...data, access: true})
            return {person, message: `${data.name} added to personal`}
        }

        return {person: null, message: `${data.phone} is exist`}
    }

    static async all() {
        const db = await mongoConnection.getDb()
        const result = await db.collection<IPerson>(this.collectionName).find().toArray()

        return  result.sort((a, b) => a.name > b.name ? 1 : -1)
    }

    static async patch(_id: string, access: boolean) {
        const db = await mongoConnection.getDb()



        return db.collection(this.collectionName).findOneAndUpdate(
            {_id: new ObjectId(_id)}, {$set: {access}}, {upsert: true, returnDocument: 'after'})
    }


    static async isAccess(phone: string, name: string) {
        const db = await mongoConnection.getDb()
        const result = await db.collection(this.collectionName).findOne({phone})

        if (result && result.name === name) return {access: result.access}

        return {access: false}
    }
}