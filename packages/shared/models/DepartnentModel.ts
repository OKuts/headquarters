import {ObjectId} from 'mongodb'


export interface IDepartmentUnit {
    _id: ObjectId | string
    department: string
}

export interface IDepartment extends IDepartmentUnit {
    main?: IDepartmentUnit
    sub?: IDepartmentUnit[]

}