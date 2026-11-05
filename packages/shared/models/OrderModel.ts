import {ObjectId} from 'mongodb'

export interface DocumentEmpty {
    [key: string]: null
}

export interface Document {
    [key: string]: {
        num: number
        date: string
    }
}

export interface IOrderDataItem {
    type: string
    description?: string
    unitsTop?: Document | DocumentEmpty
    main?: string
    mainDate?: string
    add?: string
    addDate?: string
    weUntil?: string
    mainDown?: string
    mainDownDate?: string
    addDown?: string
    addDownDate?: string
    subUntil?: string
    unitsDown?: Document | DocumentEmpty
}

export interface IOrderReturn extends IOrderDataItem {
    createdAt: string
    _id : string | ObjectId
}

