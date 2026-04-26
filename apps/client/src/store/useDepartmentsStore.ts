// apps/web/src/store/useAuthStore.ts
import { create } from 'zustand'

interface DepartmentsState {
    departments: string[]
    save: (departments: string[]) => void
}

// 2. Передаємо інтерфейс у функцію create
export const useDepartmentsStore = create<DepartmentsState>((set) => ({
    departments: [],

    save: (departments) => set({
        departments,
    }),
}))