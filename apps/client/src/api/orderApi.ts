
export const orderApi = async (send, path = 'order') => {
    try {
        const {method, data} = send

        const url = `${import.meta.env.VITE_API_URL}/api/${path}`

        const response = method === 'GET'
            ? await fetch(url)
            : await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...data}),
            })

        if (!response.ok) {
            throw new Error(`Помилка: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Помилка при відправці даних:', error)
    }
}