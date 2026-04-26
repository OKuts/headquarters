import {mongoConnection} from '../utils/mongodb'
import {ILoginMessage, IUser} from '@headquarters/shared/models/UserModel'
import bcrypt from 'bcrypt'

export class UsersClass {
    private static collectionName = 'users'

    static async registerUser(login: string, password: string): Promise<ILoginMessage> {

        const db = await mongoConnection.getDb()
        const existingUser = await db.collection<IUser>(this.collectionName).findOne({login})
        if (existingUser) return {message: 'Користувач вже існує', isLogin: true}


        const passwordHash = await bcrypt.hash(password, 10)
        await db.collection<IUser>(this.collectionName).insertOne({login, passwordHash})

        return {message: 'Реєстрація успішна', isLogin: true}
    }

    static async loginUser(login: string, password: string): Promise<ILoginMessage> {

        const db = await mongoConnection.getDb()
        const user = await db.collection<IUser>(this.collectionName).findOne({login})
        if (user) {
            const isMatch = await bcrypt.compare(password, user?.passwordHash)
            if (!isMatch) return {message: 'Невірний логін чи пароль', isLogin: false}
        } else return {message: `Користувач ${login} не зареєстрований`, isLogin: false}

        return {message: 'Вхід виконано', isLogin: true}
    }
}