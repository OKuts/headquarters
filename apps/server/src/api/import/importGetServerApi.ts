import {readSheet} from 'read-excel-file/node'
import {getEnv} from '../../utils/getEnv'
import * as fs from 'node:fs'

export const importGetServerApi = async (req, res): Promise<void> => {
    const way: string = req.url.split('/')[2]
    const folder: string = getEnv()[way]

    try {
        if (folder) {
            const files = fs.readdirSync(folder).filter(el => !el.includes('$'))
            const selectedFiles: { [key: string]: { file: string, data: [] } } = {}
            files.forEach((file) => {
                const part = file.slice(15, 19)
                if (!selectedFiles[part]) {
                    selectedFiles[part] = {file, data: []}
                } else {
                    if (selectedFiles[part].file < file) selectedFiles[part].file = file
                }
            })

            const result = await Promise.allSettled([
                ...Object.entries(selectedFiles).map(([_, el]) =>
                    readSheet(`${folder}/${el.file}`))
            ])
            Object.keys(selectedFiles).forEach((key, i) => {
                selectedFiles[key].data = result[i].value.slice(way === 'other' ? 0 : 6)
            })
            res.send({data: selectedFiles, msg: ''})
            
        } else {
            res.send({data: null, msg: 'Empty folder'})
        }
    } catch (e) {
        console.log('error folder')
        res.send({data: null, msg: e.message})
    }
}
