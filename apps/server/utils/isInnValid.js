export const isInnValid = (inn) => {
    if (/\d{10}/.test(inn) || /[А-Я]{2}\d{6}/.test(inn)) {
        const factor = [-1, 5, 7, 9, 4, 6, 10, 5, 7]
        const control = Number(inn.at(-1))
        const controlSum = inn
            .split('')
            .slice(0, -1)
            .reduce((acc, el, i) => acc + Number(el) * factor[i], 0)
        return /[А-Я]{2}\d{6}/.test(inn) || (controlSum % 11) % 10 === control
    }
    return false
}