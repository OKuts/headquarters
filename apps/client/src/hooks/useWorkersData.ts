import { useState, useEffect } from 'react'
import type {IUserClient} from '@headquarters/shared/models/UserModel.ts'

export const useWorkerData = () => {
    const [workers, setWorkers] = useState<IUserClient[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        const fetchWorker = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/api/user`
                const res = await fetch(url)
                if (!res.ok) throw new Error('Ошибка загрузки данных')
                const data = await res.json()
                if (isMounted) setWorkers(data)
            } catch (err) {
                if (isMounted) {
                    if (err instanceof Error) {
                        setError(err.message)
                    } else {
                        setError('Произошла неизвестная ошибка')
                    }
                }
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        fetchWorker()

        return () => { isMounted = false }
    }, [setIsLoading])

    return { workers, isLoading, error }
}

// Использование в компоненте:
// const { Worker, isLoading, error } = useWorker();