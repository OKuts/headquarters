
export interface IId {
    _id: string
}

export interface IDepartmentName {
    department: string
}

export interface IDepartmentFull extends IDepartmentName, IId {}


export interface IDepartment extends IDepartmentName, IId {
    main?: string
    sub?: IDepartmentFull[] | IId[]
    isExist: boolean
}

export interface IAddParams {
    [key: string]: string
}

export interface IDepartmentRequest  {
    _id: string
    method: string
    data?: IDepartment | IId
    action?: {
        [key: string] : string
    }
}


