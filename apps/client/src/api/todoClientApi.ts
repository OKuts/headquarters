import type {IAssigneeRequest} from '@headquarters/shared'

export const todoClientApi = async (send: IAssigneeRequest) => {
    try {
        const {method, data, action, _id} = send

        const url = `${import.meta.env.VITE_API_URL}/api/todo`
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                // Якщо ви використовуєте авторизацію через токени:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({data, action, _id}),
        })

        if (!response.ok) {
            throw new Error(`Помилка: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Помилка при відправці даних:', error)
    }
}