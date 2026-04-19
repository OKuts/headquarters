const getDates = (str) => {
    if (str instanceof Date) {
        return [new Date(str).getTime()]
    } else {
        const result = []
        const dates = str.replace(/[^0-9.]+/, ' ').split(' ').filter(el => el)
        if (dates.join('').length !== dates.length * 10) return [0]
        dates.forEach(el => {
            const [day, month, year] = el.split('.')
            result.push(Date.parse(`${year}-${month}-${day}`))
        })
        return result
    }
}

export const getPeriods = (inn, order, begin, end) => {
    const errors = {}
    const result = {}
    const numPeriods = [getDates(begin), getDates(end)]
    if (numPeriods[0].length !== numPeriods[1].length || !numPeriods[0][0] || !numPeriods[0][0]) {
        if (!errors[inn]) errors[inn] = []
        errors[inn].push(order)
    } else {
        numPeriods[0].forEach((el, i) => {
            if (el > numPeriods[1][i]) {
                if (!errors[inn]) errors[inn] = []
                errors[inn].push(order)
            } else {
                for (let j = el; j <= numPeriods[1][i]; j += 86400000) {
                    if (!result[j]) result[j] = []
                    result[j].push(order)
                }
            }
        })
    }

    return [result, errors]
}