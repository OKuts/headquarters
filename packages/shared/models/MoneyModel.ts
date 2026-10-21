export type TMoneyLine = [
        string | null,
        string | null,
        number | null,
        number | null,
        number | null,
        number | null,
        number | null,
        number | null,
        number | null,
        number | null,
        number | null,
        number | null,
        number | null,
        number | null,
        number | null,
]

export interface IMoneyData {
    [key: string]: {
        file: string
        data: TMoneyLine
    }
}