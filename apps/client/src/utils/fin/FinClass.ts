import type {ILossesBuhData, LossesBuhServerType} from '@headquarters/shared'

export class FinClass {
    public data: LossesBuhServerType

    constructor(data: LossesBuhServerType) {
        this.data = data
    }

    showFinData(searchUnit: string) {
        const out: ILossesBuhData = {total: {plus: 0, minus: 0}}
        this.data.forEach(([unit, plus, minus]) => {
            if (!out[unit]) out[unit] = {plus: 0, minus: 0}
            out[unit].plus += plus
            out[unit].minus += minus
            if (!searchUnit || String(unit).slice(0,searchUnit.length) === searchUnit) {
                out.total.plus += plus
                out.total.minus += minus
            }
        })
        return out
    }
}