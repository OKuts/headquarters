import {useGetFilesData} from '../../hooks'
import {Fragment, useEffect, useState} from 'react'
import {MoneyClass} from '../../utils/money'
import {Header} from '../total'
import {moneyTotalHeader} from '../../data'
import {outNum} from '../../utils/total/outNum.ts'
import {isMore} from '../../utils/total/isMore.ts'
import {SearchInput} from '../../elements'

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

    return <>
        <SearchInput setSearchTerm={setSearchUnit}/>
        <table
            className={'border border-collapse border-gray-200 mt-10 relative left-1/2 -translate-x-1/2 max-w-none w-max'}>
            <Header list={moneyTotalHeader}/>
            <tbody>

            {Object.keys(show).map((unit) => {
                let isCode = false
                return Object.keys(show[unit]).map((econ) =>
                    Object.keys(show[unit][econ]).map((code, i) => {
                        isCode = true
                        return <tr key={i}>
                            <td className={'border px-4 py-2 text-center'}>{`А${unit}`}</td>
                            <td className={'border px-4 py-2 text-center'}>{econ}</td>
                            <td className={'border px-4 py-2 text-center'}>{code}</td>
                            {show[unit][econ][code].map((el, j) => <Fragment key={j}>
                                    <td
                                        className={`whitespace-nowrap border px-2 py-2 text-right ${getCn(show[unit][econ][code], j)}`}
                                        key={j}>
                                        {outNum(el)}
                                    </td>
                                    {[2, 6, 9, 12].includes(j) && <Fragment>
                                        <td
                                            className={'whitespace-nowrap border px-2 py-2 text-center'}
                                            key={j}>
                                            {outNum(el / show[unit][econ][code][j - (j < 9 ? 2 : 1)])}
                                        </td>
                                        <td
                                            className={'whitespace-nowrap border px-2 py-2 text-center'}
                                            key={j}>
                                            {outNum(show[unit][econ][code][j - (j < 9 ? 2 : 1)] - el)}
                                        </td>
                                    </Fragment>}

                                    {[3, 7, 10, 13].includes(j) && <Fragment>
                                        <td
                                            className={'whitespace-nowrap border px-2 py-2 text-right'}
                                            key={j}>
                                            {outNum(show[unit][econ][code][j - 2] - el)}
                                        </td>
                                    </Fragment>}

                                </Fragment>
                            )}
                        </tr>
                    }))
            })
            }
            <tr>
                <td colSpan={3} className={'border px-4 py-2 text-center'}>Разом
                </td>
                {show.total.map((el, j) => <Fragment key={j}>
                    <td className={'whitespace-nowrap border px-4 py-2 text-right'}>
                        {outNum(el)}
                    </td>
                    {[2, 6, 9, 12].includes(j) && <Fragment>
                        <td
                            className={'whitespace-nowrap border px-2 py-2 text-center'}
                            key={j}>
                            {outNum(el / show.total[j - (j < 9 ? 2 : 1)])}
                        </td>
                        <td
                            className={'whitespace-nowrap border px-2 py-2 text-center'}
                            key={j}>
                            {outNum(show.total[j - (j < 9 ? 2 : 1)] - el)}
                        </td>
                    </Fragment>}
                    {[3, 7, 10, 13].includes(j) && <Fragment>
                        <td
                            className={'whitespace-nowrap border px-2 py-2 text-right'}
                            key={j}>
                            {outNum(show.total[j - 2] - el)}
                        </td>
                    </Fragment>}
                </Fragment>)
                }
            </tr>
            </tbody>
        </table>
    </>
}