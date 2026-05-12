import type {IDepartmentUnitId} from '@headquarters/shared'

export const getDepartment = (id: string, departments: IDepartmentUnitId[]) =>
    departments.find(department => id === department._id)
