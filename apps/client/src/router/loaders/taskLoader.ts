export const taskLoader = async () => {

    const response = await fetch('/api/tasks')
    if (!response.ok) throw new Error("Користувача не знайдено");

    return response
}