import type {IUserAuth, IUserClient} from '@headquarters/shared/models/UserModel.ts'

export const authClientApi = async (data: IUserAuth | IUserClient) => {
    const url = import.meta.env.VITE_API_URL
    console.log(data)
    return await fetch(`${url}/api/user`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json', // Обов'язково для JSON
            // Якщо потрібна авторизація:
            // 'Authorization': `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`
        },
        body: JSON.stringify(data)
    })
}