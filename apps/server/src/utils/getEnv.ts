import 'dotenv/config'

export const getEnv = () => {
    const db = process.env.DB
    const folder = process.env.FOLDER

    return {db, folder}
}
