import {IDepartmentFull} from './DepartnentModel'

export enum ERoles {
    BOSS = 'Керівник',
    SUB = 'Заступник',
    USER = 'Спеціаліст',
}

export interface IUserAuth {
    password: string
    login: string
}

export interface IUserPersonData {
    login: string
    name: string
    inn: string
    role: ERoles
}

export interface IUserRegister extends IUserPersonData {
    password: string
    department: string
}


export interface IUserClient extends IUserPersonData{
    _id: string
    department: string | IDepartmentFull
}

export interface ILoginMessage {
    message: string
    isLogin: boolean
    user: IUserClient | null
}

export interface IAdminReq {
    _id: string
    password: string
    admin: string
}



