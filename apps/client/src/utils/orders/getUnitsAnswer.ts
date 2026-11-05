import type {DocumentEmpty, Document, KeyString} from '@headquarters/shared'

export const getUnitsAnswer = (units: DocumentEmpty | Document , departmentsNames: KeyString) => {

    return Object.keys(units)
        .sort((a,b)=> departmentsNames[a].slice(0, 4) > departmentsNames[b].slice(0, 4) ? 1 : -1)
        .map(el => `${el}А${departmentsNames[el].slice(0, 4)} (${units[el] && units[el].date && units[el].num 
            ? units[el].date + ' #' + units[el].num : ''})`)

}
