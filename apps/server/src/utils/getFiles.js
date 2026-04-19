import fs from 'fs'

export const getFiles = (units, path, years) => {
    return units.map(file => {
        const folder = file.slice(0, 5)
        const filesInFolder = fs.readdirSync(`${path}${folder}`)
            .filter(el => !el.includes('$') && years.some(part => el.includes(part)))
        return filesInFolder.map(el => `${path}${folder}/${el}`)

    })
}