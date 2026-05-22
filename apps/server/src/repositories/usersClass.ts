import {mongoConnection} from '../utils/mongodb'
import {IUserAuth, IUserRegister,} from '@headquarters/shared/models/UserModel'
import bcrypt from 'bcrypt'
import {DepartmentsClass} from './departmentsClass'
import {InsertOneResult, ObjectId} from 'mongodb'

export class UsersClass {
    private static collectionName = 'users'

    static async registerUser(data: IUserRegister) {

        const db = await mongoConnection.getDb()
        const {login, password, name, department, role, inn} = data
        const existingUser = await db.collection(this.collectionName).findOne({login}, {projection: {password: 0}})
        if (existingUser) return {message: `Користувач ${existingUser.login} вже існує`, isLogin: false, user: null}

        const passwordHash = await bcrypt.hash(password || '', 10)

        const user: InsertOneResult = await db.collection(this.collectionName).insertOne({
            login,
            password: passwordHash,
            name,
            inn,
            department: new ObjectId(department),
            role,
        })

        return {message: `Зареєстровано користувача: ${login}`, isLogin: true, user: {...data, _id: user.insertedId.toString()}}
    }

    static async loginUser(data: IUserAuth) {

        const db = await mongoConnection.getDb()
        const user = await db.collection(this.collectionName).findOne({login: data.login})

        if (user) {
            const {password, ...out} = user
            const isMatch = await bcrypt.compare(data.password, password)
            if (!isMatch) return {message: 'Неточність паролю', isLogin: false, user: null}
            const department = await DepartmentsClass.findOne(user.department)
            if (department) {
                return {
                    message: `Вітаю Вас ${user.name.split(' ').slice(1).join(' ')}`,
                    isLogin: true,
                    user: {
                        ...out,
                        department: {_id: department._id, department: department.department}
                    }
                }
            }

        } else return {message: `Користувач ${data.login} не зареєстрований`, isLogin: false, user: null}
    }
}