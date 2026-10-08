export const getLossesApi = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/import/losses`
        const response = await fetch(url).then(res => res.json())
        return await response.json()
    } catch (error) {
        console.error('Помилка при отриманні даних:', error)
    }
}