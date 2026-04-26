export enum ERoles {
    BOSS = 'Керівник',
    SUB = 'Заступник',
    USER = 'Спеціаліст',
}

export interface IUser {
    _id?: any // MongoDB ID
    login: string
    name: string
    role: ERoles
    passwordHash: string
    main: string
    unit: string
    sub: string
}

export interface ILoginMessage {
    message: string
    isLogin: boolean
}
