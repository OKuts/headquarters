import {mongoConnection} from '../utils/mongodb'
import bcrypt from 'bcrypt'
import {IAdminPassword} from '@headquarters/shared/models/UserModel'

export class AdminClass {
    private static collectionName = 'admins'

    static async isAdmin(password: string): Promise<boolean> {
        const db = await mongoConnection.getDb()
        const existingAdmins = await db.collection<IAdminPassword>(this.collectionName).find().toArray()
        const passwords = existingAdmins.map(el => el.password)
        const promises = passwords.map(hash => bcrypt.compare(password, hash))
        const results = await Promise.all(promises)

        return results.includes(true)
    }
}