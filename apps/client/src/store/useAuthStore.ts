// apps/web/src/store/useAuthStore.ts
import { create } from 'zustand'
import type {IUserClient} from '@headquarters/shared/models/UserModel.ts' // Імпорт типів

// 1. Описуємо інтерфейс нашого сховища
interface AuthState {
    user: IUserClient | null
    isLoggedIn: boolean
    // Функції (actions) теж типізуємо
    setCurrUser: (userData: IUserClient) => void
    logout: () => void
}

// 2. Передаємо інтерфейс у функцію create
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoggedIn: false,

    setCurrUser: (userData) => set({
        user: userData,
        isLoggedIn: true
    }),

    logout: () => set({
        user: null,
        isLoggedIn: false
    }),
}))