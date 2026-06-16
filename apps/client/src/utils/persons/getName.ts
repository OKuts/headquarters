const getBigFirst = (word: string) => {
    return word ? `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}` : ''
}

export const getName = (man: string): string => {

    const [surname, name, ...rest] = man.split(' ').filter(el => el)
    const byFather = rest.length > 0 ? rest.join(' ').toLowerCase() : ''

    return `${surname.toUpperCase()} ${getBigFirst(name)} ${getBigFirst(byFather)}`
}