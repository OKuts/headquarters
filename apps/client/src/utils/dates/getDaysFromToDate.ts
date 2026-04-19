import dayjs from "dayjs";

dayjs().format()

export const getDaysFromToDate = (date: string) => {
    const today = dayjs()
    const [year, month] = today.format('YYYY-MM-DD').split('-')
    const select = date[0]
    const num = date.length < 4 ? Number(date.slice(1)) : 0
    switch (select) {
        case 'd': {
            const dayOfWeek = dayjs().day()
            if (num === dayOfWeek) return [0, [today.format('YYYY-MM-DD'), date]]
            const thisDay = dayjs().day(num)
            const nextDay = thisDay.add(1, 'week')
            return [
                [thisDay.diff(today, 'day'), thisDay.format('YYYY-MM-DD'), date],
                [nextDay.diff(today, 'day'), nextDay.format('YYYY-MM-DD'), date]
            ]
        }

        case 'n': {
            const currDay = dayjs(`${year}-${month}-${num}`)
            return [[currDay.diff(today, 'day'), currDay.format('YYYY-MM-DD'), date]]
        }

        default:
            return [[dayjs(date).diff(today, 'day'), date.slice(0, 10), '---']]
    }
}