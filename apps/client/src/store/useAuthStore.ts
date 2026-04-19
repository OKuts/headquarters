// apps/web/src/store/useAuthStore.ts
import { create } from 'zustand'
import { UserRole, type User } from '@headquarters/shared' // Імпорт типів

// 1. Описуємо інтерфейс нашого сховища
interface AuthState {
    user: User | null
    isLoggedIn: boolean
    // Функції (actions) теж типізуємо
    login: (userData: { id: string; name: string; role: UserRole; email: string }) => void
    logout: () => void
    updateRole: (newRole: UserRole) => void
}

// 2. Передаємо інтерфейс у функцію create
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoggedIn: false,

    login: (userData) => set({
        user: userData,
        isLoggedIn: true
    }),

    logout: () => set({
        user: null,
        isLoggedIn: false
    }),

    updateRole: (newRole) => set((state) => ({
        user: state.user ? { ...state.user, role: newRole } : null
    }))
}))