import readXlsxFile from 'read-excel-file/node'
import {getEnv} from '../../utils/getEnv'
import * as fs from 'node:fs'

export const importGetServerApi = async (req, res): Promise<void> => {
    const folder = getEnv().folder


    try {
        if (folder) {
            const files = fs.readdirSync(folder).filter(el => !el.includes('$'))
            const selectedFiles: { [key: string]: {file: string, data: [] }} = {}
            files.forEach((file) => {
                const part = file.slice(15, 19)
                if (!selectedFiles[part] )  {
                    selectedFiles[part] = {file, data: []}
                } else {
                    if (selectedFiles[part].file < file) selectedFiles[part].file = file
                }
            })

            const result = await Promise.allSettled([
                ...Object.entries(selectedFiles).map(([_, el]) => readXlsxFile(fs.createReadStream(`${folder}/${el.file}`)))
            ])
            Object.keys(selectedFiles).forEach((key, i) => {
                selectedFiles[key].data = result[i].value[0].data.slice(6)
            })

            res.send({data:selectedFiles, msg: ''})
        } else {
            res.send({data: null, msg: 'Empty folder'})
        }

    } catch (e) {
        console.log('error folder')
        res.send({data: null, msg: e.message})
    }
}


// export const balanceApi = async (req, res) => {
//
//     const filesMonth = fs.readdirSync(`${folder}/balance/month`).filter(el => !el.includes('$'))
//     const filesCurrent = fs.readdirSync(`${folder}/balance/current`).filter(el => !el.includes('$'))
//     const filesDone = fs.readdirSync(`${folder}/balance/done`).filter(el => !el.includes('$'))
//     try {
//         const result = await Promise.allSettled([
//             ...filesMonth.map(el => readXlsxFile(fs.createReadStream(`${folder}/balance/month/${el}`))),
//             ...filesCurrent.map(el => readXlsxFile(fs.createReadStream(`${folder}/balance/current/${el}`))),
//             ...filesDone.map(el => readXlsxFile(fs.createReadStream(`${folder}/balance/done/${el}`)))
//         ])
//         res.send([
//             [...filesMonth, ...filesCurrent].map(el => el.slice(0, -5)),
//             result.map(el => el.value.slice(1).map(line => line.slice(0,8)))
//         ])
//     } catch (e) {
//         console.log('error balanceApi')
//         res.send([])
//     }
// }