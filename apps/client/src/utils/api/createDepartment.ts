import type {IDepartment} from '@headquarters/shared'

export const createDepartment = async (data: IDepartment) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/department/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Якщо ви використовуєте авторизацію через токени:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error(`Помилка: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Помилка при відправці даних:', error)
    }
}