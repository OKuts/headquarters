import type {IPersonData} from '@headquarters/shared/models/PersonModel.ts'

export const personsClientApi = async (data: IPersonData) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/persons`
        const obj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Якщо ви використовуєте авторизацію через токени:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({...data, accesses: true}),
        }

        const response = await fetch(url, obj)
        const out = await response.json()
        return {out, message: 'Person added successfully.'}
    } catch (error) {

        return {out: null, message: `Error while fetching person details. ${error}`}
    }
}