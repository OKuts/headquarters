import {create} from 'zustand'
import type {IDepartmentClient} from '@headquarters/shared'


interface DepartmentsState {
    currId: string
    departments: IDepartmentClient[]

    saveDepartment: (department: IDepartmentClient) => void
    saveDepartments: (departments: IDepartmentClient[]) => void
    updateDepartment: (department: IDepartmentClient) => void
    deleteDepartment: (id: string) => void
    setCurrId: (id: string) => void
}

export const useDepartmentsStore = create<DepartmentsState>((set) => ({
    currId: '',
    departments: [],

    saveDepartments: (departments: IDepartmentClient[]) => set({departments}),

    saveDepartment: (department: IDepartmentClient) => set((state) => ({
        departments: [...state.departments, department]
    })),

    deleteDepartment: (id: string) => set((state) => ({
        departments: state.departments.filter(el => el._id !== id)
    })),

    updateDepartment: (department: IDepartmentClient) => set((state) => ({
        departments: state.departments.map((el) =>
            el._id === department._id ? {...el, department: department.department} : el
        )
    })),

    setCurrId: (id: string) => set({currId: id})

}))