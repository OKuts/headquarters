import {ObjectId} from 'mongodb'

export interface IDepartment {
    department: string
}

export interface IDepartmentId {
    _id: string | ObjectId | undefined
    department: string
}

export interface IDepartmentUnit {
    department: string
    main?: IDepartmentId
    sub?: IDepartmentId[]
}

export interface IDepartmentUnitId extends IDepartmentUnit {
    _id: string
}


export interface IDepartmentServer extends IDepartmentUnit {
    _id: ObjectId
}

export interface IId {
    _id: string
}

export interface IAddParams {
    [key: string]: string
}

export interface IDepartmentsRequest  {
    _id?: string | ObjectId | undefined
    method: string
    data?: IDepartmentUnit | IId
    add?: IAddParams
}
