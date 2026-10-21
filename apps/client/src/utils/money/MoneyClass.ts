import type {IMoneyData} from '@headquarters/shared/models/MoneyModel.ts'

export class MoneyClass {
    public data: IMoneyData

    constructor(money: IMoneyData) {
        this.data = money
    }

    showTotal(searchUnit: string) {
        const out = {total: new Array(11).fill(0)}
        Object.keys(this.data).forEach((unit) => {
            if (!searchUnit || unit.includes(searchUnit)) {
                if (!out[unit]) out[unit] = {}
                if (this.data[unit].data.length === 0) this.data[unit].data =
                    [[' ', ' ', ...new Array(14).fill(0)]]
                this.data[unit].data.forEach((line, j) => {
                    const code = String(line[0])+ String(line[1])
                    if (!out[unit][code]) out[unit][code] = new Array(11).fill(0)
                    line.forEach((el, i) => {
                        if (i > 1 && i < 13) {
                            out[unit][code][i - 2] += el
                            out.total[i - 2] += el
                        }
                    })
                })
            }
        })

        return out
    }
}