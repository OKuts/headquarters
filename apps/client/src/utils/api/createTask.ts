
export const createTask = async (taskData: { title: string; type: 'once' | 'monthly' | 'weekly'; deadline: string }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Якщо ви використовуєте авторизацію через токени:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(taskData),
        })

        if (!response.ok) {
            throw new Error(`Помилка: ${response.status}`)
        }

        const result = await response.json()
        return result
    } catch (error) {
        console.error('Помилка при відправці даних:', error)
    }
}