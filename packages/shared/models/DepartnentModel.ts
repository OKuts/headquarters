import {ObjectId} from 'mongodb'

export interface IDepartmentUnit {
    department: string
    main?: IDepartmentUnit
    sub?: IDepartmentUnit[]
}

export interface IDepartmentClient extends IDepartmentUnit {
    _id: string
}

export interface IDepartmentServer extends IDepartmentUnit {
    _id: ObjectId
}

export interface IId {
    _id: string
}


export interface IDepartmentsRequest  {
    method: string
    data?: IDepartmentClient | IId
}