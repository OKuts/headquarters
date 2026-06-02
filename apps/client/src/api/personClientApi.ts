import type {IPersonData, IPersonId} from '@headquarters/shared/models/PersonModel.ts'

export const personsClientApi = async (data: IPersonData | IPersonId, method: string) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/personal`
        const obj = {
            method,
            headers: {
                'Content-Type': 'application/json',
                // Якщо ви використовуєте авторизацію через токени:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data),
        }

        const response = await fetch(url, obj)
        const out = await response.json()
        return {out, message: method === 'POST' ? 'Person added successfully' : 'Status changed'}
    } catch (error) {

        return {out: null, message: `Error while fetching person details. ${error}`}
    }
}