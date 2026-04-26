import 'dotenv/config'

export const getEnv = () => {
    const db = process.env.DB

    return {db}
}