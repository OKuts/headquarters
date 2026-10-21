import 'dotenv/config'

export const getEnv = () => {
    const db = process.env.DB || ''
    const losses = process.env.FOLDER_LOSSES || ''
    const money = process.env.FOLDER_MONEY || ''
    const other = process.env.FOLDER_BUH || ''

    return {db, losses, money, other}
}
