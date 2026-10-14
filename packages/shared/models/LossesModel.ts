export type TLossesLine = [
    string,
        string | null,
        number | null,
        string | null,
        string | null,
        number | null,
        string | null,
        number | null,
        string | null,
]

export interface ILossesData {
    [key: string]: {
        file: string
        data: TLossesLine
    }
}

export interface ILossesTotalData {
    event: number
    eventYear: number,
    eventMonth: number,
    eventWeek: number,
    eventPreWeek: number,
    order: number,
    orderYear: number,
    orderPreMonth: number,
    orderMonth: number,
    orderPreWeek: number,
    orderWeek: number,
    minus: number,
    minusYear: number,
    minusPreMonth: number,
    minusMonth: number,
    minusPreWeek: number,
    minusWeek: number,
}

export interface ILossesTotalArr  {
    [key: string]: ILossesTotalData
}
