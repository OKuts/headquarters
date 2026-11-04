import type {IOrderReturn} from '@headquarters/shared'

export const getDocuments = (obj: IOrderReturn, isTop: boolean) => {
    const {mainDate, main, mainAddDate, mainAdd, mainDown, mainDownDate, addDown, addDownDate} = obj
    const first = main ? `${mainDate || ''} #${main || ''}` : ''
    const second = mainAdd ? ` (${mainAddDate || ''} ${mainAdd || ''})` : ''
    const firstDown = mainDown ? `${mainDownDate || ''} #${mainDown || ''}` : ''
    const secondDown = addDown ? ` (${addDownDate || ''} ${addDown ? '#' : ''}${addDown || ''})` : ''
    return isTop ? `${first}\n${second}` : `${firstDown}\n${secondDown}`
}