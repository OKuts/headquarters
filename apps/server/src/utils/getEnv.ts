import dotenv from "dotenv"

dotenv.config()

export const getEnv = () => {
    const folder = process.env.FOLDER

    return {folder}
}