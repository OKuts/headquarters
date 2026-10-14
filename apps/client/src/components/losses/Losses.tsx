import {useGetFilesData} from '../../hooks'
import {useEffect, useState} from 'react'
import {LossesClass} from '../../utils/losses'
import type {ILossesTotalArr} from '@headquarters/shared'
import {Header} from '../total'
import {outNum} from '../../utils/total/outNum.ts'
import {lossesTotalHeader} from '../../data'
import {SearchInput} from '../../elements'

export const Losses = () => {

    const {result, isLoading, error} = useGetFilesData('losses')
    const [totalLosses, setTotalLosses] = useState<ILossesTotalArr | null>(null)
    const [searchUnit, setSearchUnit] = useState('')

    useEffect(() => {
        if (result) {
            const lossesData: LossesClass = new LossesClass(result)
            setTotalLosses(lossesData.showTotal(searchUnit))
        }
    }, [result, searchUnit])

    if (isLoading || error || !totalLosses) return

    return <>
        <SearchInput setSearchTerm={setSearchUnit}/>
        <table className={'border border-collapse border-gray-200 mt-10 relative left-1/2 -translate-x-1/2 max-w-none w-max'}>
            <Header list={lossesTotalHeader}/>
            <tbody>
            {Object.keys(totalLosses).map(unit => <tr key={unit}>
                <td className={'border px-4 py-2 text-center' }>{unit === 'total' ? 'Разом' : `А${unit}`}</td>
                <td className={'border px-4 py-2 text-right' }>
                    {outNum(totalLosses[unit].event)}</td>
                <td className={'border px-4 py-2 text-right' }>{outNum(totalLosses[unit].order)}</td>
                <td className={'border px-4 py-2 text-right' }>{outNum(totalLosses[unit].orderPreMonth)}</td>
                <td className={'border px-4 py-2 text-right' }>{outNum(totalLosses[unit].orderMonth)}</td>
                <td className={'border px-4 py-2 text-right' }>{outNum(totalLosses[unit].orderPreWeek)}</td>
                <td className={'border px-4 py-2 text-right' }>{outNum(totalLosses[unit].orderWeek)}</td>
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