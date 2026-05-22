// apps/web/src/store/useAuthStore.ts
import {create} from 'zustand'

// 1. Описуємо інтерфейс нашого сховища
interface AdminState {
    admin: string
    setAdmin: (admin: string) => void
}

export const useAdminStore = create<AdminState>((set) => ({
    admin: '',

    setAdmin: (admin) => set({admin}),
}))