import {useGetLossesData} from '../../hooks'
import {useEffect, useState} from 'react'
import {LossesClass} from '../../utils/losses'
import type {ILossesTotalArr} from '@headquarters/shared'
import {Header} from '../total'
import {outNum} from '../../utils/total/outNum.ts'
import {lossesTotalHeader} from '../../data'

export const Losses = () => {

    const {losses, isLoading, error} = useGetLossesData()
    const [totalLosses, setTotalLosses] = useState<ILossesTotalArr | null>(null)

    useEffect(() => {
        if (losses) {
            const lossesData: LossesClass = new LossesClass(losses)
            setTotalLosses(lossesData.showTotal())
        }
    }, [losses])

    if (isLoading || error || !totalLosses) return

    return <>
        <table className={'border border-collapse border-gray-200 mt-10'}>
            <Header list={lossesTotalHeader}/>
            <tbody>
            {Object.keys(totalLosses).map(unit => <tr key={unit}>
                <td className={'border px-4 py-2 text-center' }>{unit === 'total' ? 'Разом' : `А${unit}`}</td>
                <td className={'border px-4 py-2 text-right' }>
                    {outNum(totalLosses[unit].event)}</td>
                <td className={'border px-4 py-2 text-right' }>{outNum(totalLosses[unit].order)}</td>
                <td className={'border px-4 py-2 text-right' }>{outNum(totalLosses[unit].minus)}</td>
                <td className={'border px-4 py-2 text-right' }>{outNum(totalLosses[unit].minusPreMonth)}</td>
                <td className={'border px-4 py-2 text-right' }>{outNum(totalLosses[unit].minusMonth)}</td>
                <td className={'border px-4 py-2 text-right' }>{outNum(totalLosses[unit].minusPreWeek)}</td>
                <td className={'border px-4 py-2 text-right' }>{outNum(totalLosses[unit].minusWeek)}</td>
                <td className={'border px-4 py-2 text-right' }>{outNum(totalLosses[unit].order - totalLosses[unit].minus)}</td>
            </tr>)}
            </tbody>
        </table>
    </>
}