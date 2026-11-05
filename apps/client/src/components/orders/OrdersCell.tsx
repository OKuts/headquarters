import type {JSX} from 'react'
import {ArrowDownToLine, ArrowsUpFromLine, ArrowUpToLine, Network} from 'lucide-react'

type Props = {
    el: string | string[]
    i: number
    _id: string
    orderType: string
    handler: (id: string, type: string) => void
    n5: boolean
    n8: boolean
}

export const OrdersCell = ({el, i, _id, orderType, handler, n5, n9}: Props) => {

    const typeMaps: Record<string, JSX.Element> = {
        FROM_TOP: <ArrowDownToLine className={'bg-red-500'}/>,
        FROM_DOWN: <ArrowUpToLine className={'bg-green-500'}/>,
        MIDDLE_UP: <ArrowsUpFromLine className={'bg-blue-500'}/>,
        MIDDLE_DOWN: <Network className={'bg-yellow-500'}/>,
    }

    switch (typeof el) {
        case 'string': {
            switch (i) {
                case 1 :
                    return <td className={'border px-1 py-1 text-center'}>{typeMaps[el]}</td>
                case 2 :
                case 4 :
                    return <td className={'border px-1 py-1 whitespace-pre-line'}>{el}</td>
                case 3 :
                case 5 :
                case 6 :
                case 9 :
                    return <td className={'border px-1 py-1 text-center whitespace-pre-line'}>{el}</td>
                case 7 :
                    return <td className={'border px-1 py-1 whitespace-pre-line'}>{el}</td>
                default:
                    return <></>
            }
        }
        case 'object': {
            switch (i) {
                case 6 :
                    return <td onClick={orderType === 'FROM_TOP' && n5 ? () => handler(_id, 'FROM_TOP') : () => null}
                               className={'border px-1 py-1'}>
                        {el.map(el =>
                            <div className={el.length < 48 && orderType === 'FROM_TOP' && n5 ? 'text-red-600' : ''}>
                                {el.slice(24)}
                            </div>)}
                    </td>
                case 8 :
                    return <td onClick={orderType === 'FROM_TOP' && n9 ? () => handler(_id, 'MIDDLE_DOWN') : () => null}
                        className={n9 ? 'border px-1 py-1' : 'border px-1 py-1 flex-wrap gap-2'}>
                        {el.map(el =>
                            <div className={el.length < 48 && orderType === 'FROM_TOP' && n9 ? 'text-red-600' : ''}>
                                {el.slice(24)}
                            </div>)}
                    </td>
                default:
                    return <></>
            }
        }
        default:
            return <></>
    }
}
