import {mongoConnection} from '../utils/mongodb'
import bcrypt from 'bcrypt'
import {IAdminReq} from '@headquarters/shared/models/UserModel'
import {ObjectId} from 'mongodb'

export class AdminClass {
    private static collectionName = 'admins'

    static async isAdmin(data: IAdminReq): Promise<boolean> {
        const db = await mongoConnection.getDb()
        console.log(data)
        const currAdmin = await db.collection(this.collectionName).findOne({_id: new ObjectId(data._id)})

        console.log(currAdmin)
        return currAdmin ? bcrypt.compare(data.password, currAdmin.password) : false
    }

    static async all() {
        const db = await mongoConnection.getDb()
        return await db.collection(this.collectionName).find({}, {projection: {password: 0, admin: 0}}).toArray()
    }
}