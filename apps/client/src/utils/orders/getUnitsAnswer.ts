import type {DocumentEmpty, Document, KeyString} from '@headquarters/shared'

export const getUnitsAnswer = (units: DocumentEmpty | Document , departmentsNames: KeyString) => {

    return Object.keys(units)
        .map(el => `А${departmentsNames[el].slice(0, 4)} (${units[el] && units[el].date && units[el].num 
            ? units[el].date + ' #' + units[el].num : ''})`)
        .toSorted()
}
