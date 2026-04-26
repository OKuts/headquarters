export const departmentsLoader = async () => {

    const url = import.meta.env.VITE_API_URL

    const response = await fetch(`${url}/api/departments/get`)

    if (!response.ok) throw new Error('Підрозділи не знайдено')

    return response
}