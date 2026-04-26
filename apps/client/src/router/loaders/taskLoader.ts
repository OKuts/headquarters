export const taskLoader = async () => {
    const url = import.meta.env.VITE_API_URL

    const response = await fetch(`${url}/api/tasks/get`)
    if (!response.ok) throw new Error('Користувача не знайдено')

    return response
}