export const outNum = (n: number | string): string => {
    if (typeof n === 'string') return 'error'
    return n && Math.abs(n) >= 1 ?
        (n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('.',',')
        : ''
}