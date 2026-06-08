import type {IDepartment} from '@headquarters/shared'

export const getDepartment = (id: string, departments: IDepartment[]) =>
    departments.find(department => id === department._id)
