import type {IDepartmentRequest} from '@headquarters/shared'

export const departmentsClientApi = async (send: IDepartmentRequest) => {
    try {
        const {method, data, action = {}, _id} = send

        const url = `${import.meta.env.VITE_API_URL}/api/departments`
        const obj = {
            method,
            headers: {
                'Content-Type': 'application/json',
                // Якщо ви використовуєте авторизацію через токени:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({data, action, _id}),
        }

        const response = method === 'GET' ? await fetch(url) : await fetch(url, obj)

        if (!response.ok) {
            throw new Error(`Помилка: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Помилка при відправці даних:', error)
    }
}