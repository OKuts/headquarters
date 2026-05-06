import {type FC, useState} from 'react'

interface Props {
    onSuccess: (isAdmin: boolean) => void; // Функція, яка виконається при успішному паролі
    onCancel: (into: boolean) => void;
    actionLabel?: string;
}

export const PasswordConfirm: FC<Props> = ({ onSuccess, onCancel, actionLabel = 'Підтвердити повноваження' }: Props) => {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-admin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            })
            if (response.ok) {
                const data =  await response.json()
                onSuccess(data.isAdmin)
            } else {
                setError('Доступ відхилено: невірний пароль')
            }
        } catch (_) {
            setError('Помилка з\'єднання з сервером')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">

            <button
                onClick={()=>onCancel(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Закрити"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Перевірка доступу</h2>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
                {/* Поле вводу пароля */}
                <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                    <label className="block text-sm font-medium text-amber-800 mb-1">
                        Пароль
                    </label>
                    <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`mt-1 block text-red-600  w-full px-3 py-2 border rounded-md shadow-sm outline-none focus:ring-2 transition-all ${
                            error
                                ? 'border-red-500 focus:ring-red-200'
                                : 'border-amber-300 focus:ring-amber-500 focus:border-amber-500'
                        }`}
                        placeholder="••••••••"
                    />
                    {error && (
                        <p className="text-red-600 text-xs mt-2 font-medium animate-pulse">
                            {error}
                        </p>
                    )}
                </div>

                {/* Кнопка підтвердження */}
                <button
                    type="submit"
                    disabled={loading || !password}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 transition-colors"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Перевірка...
            </span>
                    ) : (
                        <span className={'font-bold'}>{actionLabel}</span>
                    )}
                </button>
            </form>
        </div>
    )
}

