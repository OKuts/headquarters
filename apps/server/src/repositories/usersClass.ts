import {mongoConnection} from '../utils/mongodb'
import {IUserAuth, IUserRegister,} from '@headquarters/shared/models/UserModel'
import bcrypt from 'bcrypt'
import {DepartmentsClass} from './departmentsClass'
import {InsertOneResult, ObjectId} from 'mongodb'
import {PersonalClass} from './personalClass'

export class UsersClass {
    private static collectionName = 'users'

    static async removeByInn(inn: string) {
        const db = await mongoConnection.getDb()
        return await db.collection(this.collectionName).deleteOne({inn})
    }


    static async allAccess() {
        const db = await mongoConnection.getDb()
        return db.collection(this.collectionName).aggregate([
            // 1. З'єднуємо колекцію users з колекцією personal
            {
                $lookup: {
                    from: 'personal', // Ім'я колекції в базі даних (зазвичай у множині)
                    localField: 'inn', // Поле з колекції users
                    foreignField: 'inn', // Поле з колекції personal, яке вказує на user
                    as: 'usersWithAccess' // Назва масиву, куди запишуться знайдені документи
                },
            },
            {
                $match: {
                    'usersWithAccess.access': true
                }
            },
            {
                $lookup: {
                    from: 'departments',
                    let: { userDeptStr: '$department' }, // Беремо рядок id з користувача
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    // Конвертуємо рядок у ObjectId та порівнюємо з _id у departments
                                    $eq: ['$_id', { $toObjectId: '$$userDeptStr' }]
                                }
                            }
                        }
                    ],
                    as: 'departmentInfo'
                }
            },
            {
                // $set перезаписує поточне поле department або створює нове, не чіпаючи інші поля
                $set: {
                    department: {
                        $arrayElemAt: ['$departmentInfo.department', 0]
                    }
                }
            },
            {
                // $unset просто прибирає непотрібні масиви з фінального результату
                $unset: ['usersWithAccess', 'departmentInfo']
            }
        ]).toArray()
    }

    static async findBoss(department: string) {
        const db = await mongoConnection.getDb()
        return await db.collection(this.collectionName)
            .findOne({department: new ObjectId(department), role: 'Керівник'}, {projection: {password: 0}})
    }

    static async registerUser(data: IUserRegister) {

        const db = await mongoConnection.getDb()
        const {login, password, name, department, role, inn} = data

        const existingUser = await db.collection(this.collectionName).findOne({login}, {projection: {password: 0}})
        if (existingUser) return {message: `Користувач ${existingUser.login} вже існує`, isLogin: false, user: null}

        if (role === 'Керівник') {
            const departmentBoss = await UsersClass.findBoss(department)
            if (departmentBoss) return {message: 'Посада зайнята (зверніться до адміністратора)', isLogin: false, user: null}
        }

        const {access} = await PersonalClass.isAccess(inn, name)

        console.log(access, inn, name)

        if (access) {
            const passwordHash = await bcrypt.hash(password || '', 10)

            const user: InsertOneResult = await db.collection(this.collectionName).insertOne({
                login,
                password: passwordHash,
                name,
                inn,
                department: new ObjectId(department),
                role,
            })

            return {
                message: `Зареєстровано користувача: ${login}`,
                isLogin: true,
                user: {...data, _id: user.insertedId.toString()}
            }
        }

        return {message: 'Вам необхідно звернутись до адміністратора для отримання доступу', isLogin: false, user: null}

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