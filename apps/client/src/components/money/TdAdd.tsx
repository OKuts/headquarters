import {Fragment} from 'react'
import {outNum} from '../../utils/total/outNum.ts'

export const TdAdd = ({obj, el, j}: {obj: any, el: number, j: number}) => {
    return <Fragment>
        {[2, 6, 9, 12].includes(j) && <Fragment>
            <td className={'whitespace-nowrap border px-1 py-1 text-right'}>
                {outNum(el / obj[j - (j < 9 ? 2 : 1)])}
            </td>
            <td className={'whitespace-nowrap border px-1 py-1 text-right'}>
                {outNum(obj[j - (j < 9 ? 2 : 1)] - el)}
            </td>
        </Fragment>}

        {[3, 7, 10, 13].includes(j) && <Fragment>
            <td
                className={'whitespace-nowrap border px-1 py-1 text-right'}>
                {outNum(obj[j - 2] - el)}
            </td>
        </Fragment>}
    </Fragment>
}