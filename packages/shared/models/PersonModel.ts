export interface IPersonData {
    name: string,
    phone: string,
}

export interface IPersonId {
    _id: string
    access?: boolean
}

export interface IPerson extends IPersonData, IPersonId {}
