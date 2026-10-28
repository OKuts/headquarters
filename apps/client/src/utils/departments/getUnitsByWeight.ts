import type {IDepartment, IDepartmentByWeight, KeyString} from '@headquarters/shared'

export const getUnitsByWeight = (departmentNames: KeyString, departments: IDepartment[]) => {

    const out: IDepartmentByWeight = {count: {}, top: {}, notCount: {}, notNot: {}, other: {},}

    const middleTop: string[] = []

    departments.forEach(department => {
        if (department.sub && department.sub.length && department.department.length > 4) {
            middleTop.push(department.department)
        }
    })

    departments.forEach(department => {
        if (middleTop.includes(department.department)) {
            if (department.sub) department.sub.forEach(el => {
                const [_, value] = Object.entries(el)[0]
                if (departmentNames[value][4] === '1') { // наявність рахунку
                    out.count[value] = departmentNames[value]
                } else if (departmentNames[value][5] === '1') {  // наявність служби
                    out.notCount[value] = departmentNames[value]
                } else {
                    out.notNot[value] = departmentNames[value]
                }
            })
        } else if (department.department.length === 4) {
            out.top[department._id] = department.department
            if (department.sub && department.department === '0000') {
                department.sub.forEach(el => {
                    const [_, value] = Object.entries(el)[0]
                    out.other[value] = departmentNames[value]
                })
            }
        }
    })

    return out
}