type WeekCheckResult = 'current_week' | 'previous_week' | 'other'

/**
 * Отримує дату початку тижня (понеділок 00:00:00) для заданої дати
 */
function getStartOfWeek(date: Date): Date {
    const result = new Date(date)
    result.setHours(0, 0, 0, 0)

    const day = result.getDay()
    const diff = (day === 0 ? 6 : day - 1)

    result.setDate(result.getDate() - diff)
    return result
}

export function checkDateWeekNative(date: Date, baseDate: Date = new Date()): WeekCheckResult {
    const currentWeekStart = getStartOfWeek(baseDate)
    const targetWeekStart = getStartOfWeek(date)

    const diffInMs = currentWeekStart.getTime() - targetWeekStart.getTime()
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
        return 'current_week'
    }

    if (diffInDays === 7) {
        return 'previous_week'
    }

    return 'other'
}