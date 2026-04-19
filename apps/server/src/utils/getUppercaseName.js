export const getUppercaseName = (name) => {
    const [surname, ...rest] = name.split(' ')
    const restFiltered = rest.filter(el => el).join(' ')
    return [surname.toUpperCase(), restFiltered].join(' ')
}