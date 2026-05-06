import {mongoConnection} from '../utils/mongodb'
import {
    ILoginMessage,
    IUser,
    IUserClient,
    IUserClientWithoutPassword,
    IUserWithoutId
} from '@headquarters/shared/models/UserModel'
import bcrypt from 'bcrypt'
import {DepartmentsClass} from './departmentsClass'
import {InsertOneResult} from 'mongodb'

export class UsersClass {
    private static collectionName = 'users'




    static async registerUser(data: IUserClient): Promise<ILoginMessage> {

        const db = await mongoConnection.getDb()
        const {login, password, name, department, role, main} = data
        const existingUser = await db.collection<IUser>(this.collectionName).findOne({login})
        if (existingUser) return {message: 'Користувач вже існує', isLogin: true, user: null}


        const passwordHash = await bcrypt.hash(password, 10)
        const mainId = await DepartmentsClass.findId(main)
        const departmentId = await DepartmentsClass.findId(department)
        const user: InsertOneResult<IUserWithoutId> = await db.collection<IUserWithoutId>(this.collectionName).insertOne({
            login,
            password: passwordHash,
            name,
            department: departmentId,
            role,
            main: mainId,
        })

        return {message: 'Реєстрація успішна', isLogin: true, user: {_id: user.insertedId.toString(), ...data, password: passwordHash}}
    }

    static async loginUser(login: string, passwordIn: string): Promise<ILoginMessage> {

        const db = await mongoConnection.getDb()
        const user = await db.collection<IUser>(this.collectionName).findOne({login})

        if (user) {
            const isMatch = await bcrypt.compare(passwordIn, user?.password)
            if (!isMatch) return {message: 'Невірний логін чи пароль', isLogin: false, user: null}
        } else return {message: `Користувач ${login} не зареєстрований`, isLogin: false, user: null}

        const main = await DepartmentsClass.findUnit(user.main)
        const department = await DepartmentsClass.findUnit(user.department)
        const {password, ...rest} = structuredClone(user)

        return {
            message: 'Вхід виконано',
            isLogin: true,
            user: {
                ...rest,
                main: main.department,
                department: department.department
            }


        }
    }
}