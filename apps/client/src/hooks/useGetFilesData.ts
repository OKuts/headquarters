import { useState, useEffect } from 'react'
import type {ILossesData} from '@headquarters/shared'

export const useGetFilesData = (path: string) => {
    const [result, setResult] = useState<ILossesData | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {        let isMounted = true

        const fetchResult = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/api/${path}`
                const res = await fetch(url)
                if (!res.ok) throw new Error('Помилка завантаження данних')
                const data = await res.json()
                if (isMounted) setResult(data.data)
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

        fetchResult()

        return () => { isMounted = false }
    }, [path, setIsLoading])

    return { result, isLoading, error }
}

