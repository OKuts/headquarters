import {create} from 'zustand'
import type {IOrderReturn} from '@headquarters/shared'


interface OrdersState {
    orders: IOrderReturn[]
    // saveDepartmentName: (department: {[keys: string]: string}) => void
    // initDepartments: (departments: IDepartment[]) => void
    saveOrders: (list: IOrderReturn[]) => void
    // updateDepartment: (department: IDepartment) => void
    // deleteDepartment: (id: string) => void
    // setCurrId: (id: string) => void
}

export const useOrdersStore = create<OrdersState>((set) => ({

    orders: [],

    saveOrders: (list: IOrderReturn[]) => set({orders: list}),

}))