import type {ILossesTotalData} from '@headquarters/shared'

export class LossesCreateClass {
    getNew() : ILossesTotalData {
        return {
                event: 0,
                eventYear: 0,
                eventMonth: 0,
                eventWeek: 0,
                order: 0,
                orderYear: 0,
                orderPreMonth: 0,
                orderMonth: 0,
                orderPreWeek: 0,
                orderWeek: 0,
                minus: 0,
                minusYear: 0,
                minusPreMonth: 0,
                minusMonth: 0,
                minusPreWeek: 0,
                minusWeek: 0,
            }
    }
}