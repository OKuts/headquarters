import fs from "fs";
import readXlsxFile from "read-excel-file/node";
import {getEnv} from "../../utils/getEnv";

export const getTasksApi = async (req, res) => {
    try {
        const folder = getEnv().folder
        const reports = await readXlsxFile(fs.createReadStream(`${folder}/reports/reports.xlsx`))
        const out = reports[0].data
            .filter(report => report[0] && report[1])
            .map(([date, ...rest],i) => [
                date,
                ...rest.map(el => String(el))
            ])
        res.send(out)
    } catch (e) {
        res.send([])
    }
}