import {useGetFilesData} from '../../hooks'
import {useEffect, useState} from 'react'
import {LossesClass} from '../../utils/losses'
import type {ILossesBuhData, ILossesTotalArr, KeyString} from '@headquarters/shared'
import {Header, ModalWrap} from '../total'
import {getModernUnit, outNum} from '../../utils/total'
import {lossesTotalHeader} from '../../data'
import {FinClass} from '../../utils/fin/FinClass.ts'
import {useSearchStore} from '../../store'

export const Losses = () => {
    const {result, isLoading, error} = useGetFilesData('losses')
    const {result: buh, isLoading: loading, error: isError} = useGetFilesData('other')
    const {searchValue, setSearch} = useSearchStore()
    const [modalData, setIsModalData] = useState({show: false, unit: '', value: ''})

    useEffect(() => {
        setSearch('')
    }, [setSearch])

    if (isLoading || error || loading || isError) return null

    const lossesData: LossesClass = new LossesClass(result)
    const [totalLosses, mtd]: [ILossesTotalArr, KeyString] = lossesData.showTotal(searchValue)

    const fin: FinClass = new FinClass(buh[''].data)
    const totalBuh: ILossesBuhData = fin.showFinData(searchValue)

    return <>
        <table
            className={'border border-collapse border-gray-200 mt-10 relative left-1/2 -translate-x-1/2 max-w-none w-max'}>
            <Header list={lossesTotalHeader}/>
            <tbody>
            {Object.keys(totalLosses).map(unit => <tr key={unit}>
                <td onClick={() => mtd[unit] ? setIsModalData({show: true, unit, value: mtd[unit]}) : null}
                    className={`border px-2 py-2 text-center ${mtd[unit] ? 'bg-blue-700' : ''}`}>
                    {unit === 'total' ? 'Разом' : getModernUnit(unit)}
                </td>
                <td className={'border px-2 py-2 text-right'}>{outNum(totalLosses[unit].event)}</td>
                <td className={'border px-2 py-2 text-right font-bold bg-gray-600'}>{outNum(totalLosses[unit].order)}</td>
                <td className={'border px-2 py-2 text-right'}>{outNum(totalLosses[unit].orderPreMonth)}</td>
                <td className={'border px-2 py-2 text-right'}>{outNum(totalLosses[unit].orderMonth)}</td>
                <td className={'border px-2 py-2 text-right'}>{outNum(totalLosses[unit].orderPreWeek)}</td>
                <td className={'border px-2 py-2 text-right'}>{outNum(totalLosses[unit].orderWeek)}</td>
                <td className={'border px-2 py-2 text-right font-bold bg-gray-600'}>{outNum(totalLosses[unit].minus)}</td>
                <td className={'border px-2 py-2 text-right'}>{outNum(totalLosses[unit].minusPreMonth)}</td>
                <td className={'border px-2 py-2 text-right'}>{outNum(totalLosses[unit].minusMonth)}</td>
                <td className={'border px-2 py-2 text-right'}>{outNum(totalLosses[unit].minusPreWeek)}</td>
                <td className={'border px-2 py-2 text-right'}>{outNum(totalLosses[unit].minusWeek)}</td>
                <td className={'border px-2 py-2 text-right font-bold bg-gray-600'}>{outNum(totalLosses[unit].order - totalLosses[unit].minus)}</td>
                <td className={'border px-2 py-2 text-right'}>{outNum(totalLosses[unit].order
                    - (totalBuh && totalBuh[unit] ? totalBuh[unit].plus : 0))}</td>
                <td className={'border px-2 py-2 text-right'}>{outNum(totalLosses[unit].minus
                    - (totalBuh && totalBuh[unit] ? totalBuh[unit].minus : 0))}</td>
            </tr>)}
            </tbody>
        </table>

        {modalData.show && <ModalWrap onClose={() => setIsModalData({show: false, unit: '', value: ''})}>
            <div className={'p-10 max-w-120 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white'}>
                <p className={'pb-10 font-bold'}>{getModernUnit(modalData.unit)}</p>
                {modalData.value.split(', ').map(el => <p key={el}>{el}</p>)}
            </div>
        </ModalWrap>}
    </>
}