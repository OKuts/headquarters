export const healthLoader = async () => {

    const response = await fetch('/api/health')
    if (!response.ok) throw new Error("Користувача не знайдено");

    return response
}