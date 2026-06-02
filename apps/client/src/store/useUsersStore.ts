import {create} from 'zustand'
import type {IUserClient} from '@headquarters/shared/models/UserModel.ts'

interface UsersState {
    users: IUserClient[]
    saveUsers: (users: IUserClient[]) => void
    addUser: (user: IUserClient) => void
}

export const useUsersStore = create<UsersState>((set) => ({
   users: [],

    saveUsers: (users: IUserClient[]) => set({users}),

    addUser: (user: IUserClient) => set((state) => ({
        users: [...state.users, user],
    })),
}))