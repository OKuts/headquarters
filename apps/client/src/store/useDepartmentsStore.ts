import { create } from 'zustand'
import type {IDepartmentClient} from '@headquarters/shared'


interface DepartmentsState {
    departments: IDepartmentClient[]
    saveDepartments: (departments: IDepartmentClient[]) => void
}

export const useDepartmentsStore = create<DepartmentsState>((set) => ({
    departments: [],

    saveDepartments: (departments: IDepartmentClient[]) => set({
        departments,
    }),
}))