export const adminsClientApi = async () => {
    const url = import.meta.env.VITE_API_URL
    return await fetch(`${url}/api/admins`)
}