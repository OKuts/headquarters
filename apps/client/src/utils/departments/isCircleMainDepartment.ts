import {getDepartment} from './getDepartment.ts'
import type {IDepartment} from '@headquarters/shared'

export const isCircleMainDepartment = (
    curr: IDepartment, main: IDepartment, departments: IDepartment[]): boolean => {

    const isCorrectMain = (curr: IDepartment, main: IDepartment): boolean => {
        if (!main.main) return true
        if (main.main === curr._id) return false
        const result = getDepartment(main.main, departments)
        if (!result) return false
        return (true && isCorrectMain(curr, result))
    }

    return isCorrectMain(curr, main)
}