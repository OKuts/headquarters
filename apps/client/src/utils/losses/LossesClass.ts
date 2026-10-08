import {type ILossesData, type ILossesTotalArr} from '@headquarters/shared'
import {LossesCreateClass} from './LosessCreateClass.ts'
import {checkDateWeekNative} from '../dates/checkDateWeekNative.ts'
import {checkDateMonthNative} from '../dates/checkDateMonthNative.ts'

export class LossesClass {
    public data: ILossesData

    constructor(losses: ILossesData) {
        this.data = losses
    }

    showTotal() {
        let out: ILossesTotalArr = {total: new LossesCreateClass().getNew()}
        Object.keys(this.data).forEach((unit) => {
            if (!out[unit]) out = {...out, [unit]: new LossesCreateClass().getNew()}
            this.data[unit].data.forEach((line, j) => {
                const date = line[0]
                const typeOfWeek = checkDateWeekNative(date)
                const typeOfMonth = checkDateMonthNative(new Date(date))
                    line.forEach((el, i) => {

                    if (el) {
                        switch (i) {
                            case 2:
                                out[unit].event += el
                                out.total.event += el
                                break
                            case 5:
                                out[unit].order += el
                                if (j > 0) {
                                    out.total.event -= el
                                    out[unit].event -= el
                                }
                                out.total.order += el
                                break
                            case 7:
                                out[unit].minus += el
                                out.total.minus += el
                                if (typeOfWeek === 'current_week') {
                                    out[unit].minusWeek += el
                                    out.total.minusWeek += el
                                } else if (typeOfWeek === 'previous_week' && date.slice(0, 10) !== '2026-10-01') {
                                    out[unit].minusPreWeek += el
                                    out.total.minusPreWeek += el
                                }
                                if (typeOfMonth === 'current_month' && date.slice(0, 10) !== '2026-10-01') {
                                    out[unit].minusMonth += el
                                    out.total.minusMonth += el
                                } else if (typeOfMonth === 'previous_month') {
                                    out[unit].minusPreMonth += el
                                    out.total.minusPreMonth += el
                                }
                                break
                        }
                    }
                })
            })
        })
        return out
    }
}