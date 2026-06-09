export const getName = (name: string): string => {

    const parts = name.split(' ').filter(el => el)

    return `${parts[0].toUpperCase()} ${parts.slice(1).join(' ')}`
}