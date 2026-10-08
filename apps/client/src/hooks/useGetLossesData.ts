import { useState, useEffect } from 'react'
import type {ILossesData} from '@headquarters/shared'

export const useGetLossesData = () => {
    const [losses, setLosses] = useState<ILossesData | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {        let isMounted = true

        const fetchLosses = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/api/losses`
                const res = await fetch(url)
                if (!res.ok) throw new Error('Помилка завантаження данних')
                const data = await res.json()
                if (isMounted) setLosses(data.data)
            } catch (err) {
                if (isMounted) {
                    if (err instanceof Error) {
                        setError(err.message)
                    } else {
                        setError('Невідома помилка')
                    }
                }
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        fetchLosses()

        return () => { isMounted = false }
    }, [setIsLoading])

    return { losses, isLoading, error }
}

