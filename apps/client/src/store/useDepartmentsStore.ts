import {create} from 'zustand'
import type {IDepartment} from '@headquarters/shared'


interface DepartmentsState {
    currId: string
    departments: IDepartment[]
    departmentsNames: {[keys: string]: string}

    saveDepartmentName: (department: {[keys: string]: string}) => void
    initDepartments: (departments: IDepartment[]) => void
    saveDepartment: (department: IDepartment) => void
    updateDepartment: (department: IDepartment) => void
    deleteDepartment: (id: string) => void
    setCurrId: (id: string) => void
}

export const useDepartmentsStore = create<DepartmentsState>((set) => ({
    currId: '',
    departments: [],
    departmentsNames: {},

    initDepartments: (departments: IDepartment[]) => set(
        {departments, departmentsNames: departments.reduce((acc, el)=> ({...acc, [el._id]: el.department}),{})}
    ),
    updateDepartment: (data: IDepartment) => set((state) => ({
        departments: state.departments.map((el) => el._id === data._id ? {...data} : el)
    })),

    saveDepartmentName: (department: {[keys: string]: string}) => set((state) => ({
        departmentsNames: {...state.departmentsNames, ...department}
    })),

    saveDepartment: (department: IDepartment) => set((state) => ({
        departments: [...state.departments, department]
    })),

    deleteDepartment: (id: string) => set((state) => ({
        departments: state.departments.filter(el => el._id !== id)
    })),

    setCurrId: (id: string) => set({currId: id})
}))