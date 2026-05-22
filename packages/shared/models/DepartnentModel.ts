
export interface IDepartmentName  {
    _id: string
    department: string
}

export interface IDepartment extends IDepartmentName{
    main?: IDepartmentName
    sub?: IDepartmentName[]
}

export interface IAddParams {
    [key: string]: string
}

export interface IDepartmentRequest  {
    _id: string
    method: string
    data?: IDepartment
    add?: IAddParams
}

