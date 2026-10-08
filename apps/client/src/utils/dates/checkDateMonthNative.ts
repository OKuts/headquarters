type MonthCheckResult = 'current_month' | 'previous_month' | 'other'

export function checkDateMonthNative(date: Date, baseDate: Date = new Date()): MonthCheckResult {
    const targetYear = date.getFullYear()
    const targetMonth = date.getMonth() // 0 - 11

    const currentYear = baseDate.getFullYear()
    const currentMonth = baseDate.getMonth()

    if (targetYear === currentYear && targetMonth === currentMonth) {
        return 'current_month'
    }

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

    if (targetYear === prevMonthYear && targetMonth === prevMonth) {
        return 'previous_month'
    }

    return 'other'
}
