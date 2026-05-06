import {ObjectId} from 'mongodb'

export enum ERoles {
    BOSS = 'Керівник',
    SUB = 'Заступник',
    USER = 'Спеціаліст',
}



export interface IUserWithoutId {
    login: string
    name: string
    role: ERoles
    password: string
    main: ObjectId | null
    department: ObjectId | null
}

export interface IUser extends IUserClientWithoutPassword {
    _id: ObjectId
}

export interface IUserClientWithoutPassword {
    _id: string // MongoDB ID
    login: string
    name: string
    role: ERoles
    main: string
    department: string
}

export interface IUser extends IUserClientWithoutPassword{
    password: string
}



export interface ILoginMessage {
    message: string
    isLogin: boolean
    user: IUserClientWithoutPassword | null
}

export interface IAdminPassword {
    password: string
}

