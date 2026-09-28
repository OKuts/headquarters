import { create } from 'zustand'
import {type IAssignee} from '@headquarters/shared' // Імпорт типів

interface AuthState {
    assignees: IAssignee[] | null
    setAssignees: (data: IAssignee[]) => void
}

export const useTodoStore = create<AuthState>((set) => ({
    assignees: null,

    setAssignees: (data: IAssignee[]) => set({
        assignees: data,
    }),
}))