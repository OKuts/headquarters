import { create } from 'zustand'
import type {IUserClient} from '@headquarters/shared/models/UserModel.ts' // Імпорт типів

interface AuthState {
    user: IUserClient | null
    setCurrUser: (userData: IUserClient) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoggedIn: false,

    setCurrUser: (userData) => set({
        user: userData,
    }),

    logout: () => set({
        user: null,
    }),
}))