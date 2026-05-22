import {create} from 'zustand'
import type {IDepartment, IDepartmentName} from '@headquarters/shared'


interface DepartmentsState {
    currId: string
    departments: IDepartment[]

    saveDepartment: (department: IDepartmentName) => void
    saveDepartments: (departments: IDepartment[]) => void
    updateDepartment: (department: IDepartment) => void
    addMainDepartment: (id: string, main: IDepartmentName) => void
    removeMainSubDepartment: (id: string, unit: IDepartmentName) => void
    addSubDepartment: (id: string, sub: IDepartmentName) => void
    deleteDepartment: (id: string) => void
    setCurrId: (id: string) => void
}

export const useDepartmentsStore = create<DepartmentsState>((set) => ({
    currId: '',
    departments: [],

    saveDepartments: (departments: IDepartment[]) => set({departments}),

    saveDepartment: (department: IDepartment) => set((state) => ({
        departments: [...state.departments, department]
    })),

    deleteDepartment: (id: string) => set((state) => ({
        departments: state.departments.filter(el => el._id !== id)
    })),

    addMainDepartment: (id: string, main: IDepartmentName) => set((state) => ({
        departments: state.departments.map((el) =>
            el._id === id ? {...el, main: {...main}} : el
        )
    })),

    removeMainSubDepartment: (id: string, unit: IDepartmentName) => set((state) => ({
        departments: state.departments.map((el) =>
            el._id === id ? unit : el
        )
    })),

    addSubDepartment: (id: string, sub: IDepartmentName) => set((state) => ({
        departments: state.departments.map((el) =>
            el._id === id ? {...el, sub: [...(el?.sub || []), sub]} : el
        )
    })),

    updateDepartment: (data: IDepartment) => set((state) => ({
        departments: state.departments.map((el) => el._id === data._id ? {...data} : el)
    })),

    setCurrId: (id: string) => set({currId: id})
}))