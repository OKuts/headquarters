import 'dotenv/config'

export const getEnv = () => {
    const db = process.env.DB
    const losses = process.env.FOLDER_LOSSES
    const money = process.env.FOLDER_MONEY

    return {db, losses, money}
}
