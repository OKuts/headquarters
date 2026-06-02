export interface IPersonData {
    name: string,
    inn: string,
}

export interface IPersonId {
    _id: string
    access?: boolean
}

export interface IPerson extends IPersonData, IPersonId {}
