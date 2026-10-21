import {useGetFilesData} from '../../hooks'
import {Fragment, useEffect, useState} from 'react'
import {MoneyClass} from '../../utils/money'
import {Header} from '../total'
import {moneyTotalHeader} from '../../data'
import {isMore, outNum} from '../../utils/total'
import {SearchInput} from '../../elements'
import {TdAdd} from './TdAdd.tsx'

const getCn = (line: number[], j: number) => {
    switch (j) {
        case 0 :
        case 4 :
        case 8 :
            return isMore(line[j], line[j + 2]) ? 'bg-blue-700' : ''
        default:
            return ''
    }
}

export const Money = () => {

    const {result, isLoading, error} = useGetFilesData('money')
    const [show, setShow] = useState(null)
    const [searchUnit, setSearchUnit] = useState('')

    useEffect(() => {
        if (result) {
            const moneyData: MoneyClass = new MoneyClass(result)
            setShow(moneyData.showTotal(searchUnit))
        }
    }, [result, searchUnit])

    if (isLoading || error || !show) return

    console.log(show)

    return <>
        <SearchInput setSearchTerm={setSearchUnit}/>
        <table
            className={'border border-collapse border-gray-200 mt-10 relative left-1/2 -translate-x-1/2 max-w-none w-max'}>
            <Header list={moneyTotalHeader}/>
            <tbody>

            {Object.keys(show).filter(el => el !== 'total').map((unit) =>
                Object.keys(show[unit]).map((code, i) =>
                    <tr key={i}>
                        {!i ? <td rowSpan={Object.keys(show[unit]).length} className={'border px-1 py-1 text-center'}>{`А${unit}`}</td> : null}
                        <td className={'border px-1 py-1 text-center'}>{code.slice(0, 4)}</td>
                        <td className={'border px-1 py-1 text-center'}>{code.slice(4)}</td>
                        {show[unit][code].map((el, j) => <Fragment key={j}>
                                <td className={`whitespace-nowrap border px-1 py-1 text-right ${getCn(show[unit][code], j)}`}>
                                    {outNum(el)}
                                </td>
                                <TdAdd obj={show[unit][code]} el={el} j={j}/>
                            </Fragment>
                        )}
                    </tr>))
            }
            <tr>
                <td colSpan={3} className={'border px-4 py-1 text-center font-bold'}>Разом
                </td>
                {show.total.map((el, j) => <Fragment key={j}>
                    <td className={'whitespace-nowrap border px-1 py-1 text-right'}>{outNum(el)}</td>
                    <TdAdd obj={show.total} el={el} j={j}/>
                </Fragment>)}
            </tr>
            </tbody>
        </table>
    </>
}