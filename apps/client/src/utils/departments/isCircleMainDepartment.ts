import type {IDepartmentUnitId} from '@headquarters/shared'
import {getDepartment} from './getDepartment.ts'

export const isCircleMainDepartment = (
    curr: IDepartmentUnitId, main: IDepartmentUnitId, departments: IDepartmentUnitId[]): boolean => {

    const isCorrectMain = (curr: IDepartmentUnitId, main: IDepartmentUnitId): boolean => {
        if (!main.main ) return true
        if (main.main._id === curr._id) return false
        const result = getDepartment(main.main._id, departments)
        if (!result) return false
        return (true && isCorrectMain(curr,  result))
    }

    return isCorrectMain(curr, main)
}