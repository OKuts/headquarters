import {AddSearchWrapper} from '../../elements/AddSearchWrapper.tsx'
import {useAdminStore, useDepartmentsStore} from '../../store'
import {type JSX, useEffect, useState} from 'react'
import {useOrdersStore} from '../../store/useOrdersStore.ts'
import {orderApi} from '../../api'
import {ArrowDownToLine, ArrowsUpFromLine, ArrowUpToLine, Network} from 'lucide-react'
import {Header, ModalWrap} from '../total'
import {ordersHeader} from '../../data'
import {getDocuments, getUnitsAnswer} from '../../utils/orders'
import {ChangeUnitAnswer} from './ChangeUnitAnswer.tsx'

type Props = {
    setAdd: (isAdd: string) => void
    watch: string
}

export const Orders = ({setAdd, watch}: Props) => {
    const {admin} = useAdminStore()
    const {orders, saveOrders} = useOrdersStore()
    const {departmentsNames} = useDepartmentsStore()
    const [currId, setCurrId] = useState<string>('')
    const [answerType, setAnswerType] = useState<string>('')

    useEffect(() => {
        orderApi({method: 'GET', data: null})
            .then(list => {
                saveOrders(list.data)
            })
    }, [saveOrders])

    const handler = (_id: string, type: string) => {
        setCurrId(_id)
        setAnswerType(type)
    }

    const close = () => {
        handler('', '')
        setAdd('')
    }

    const typeMaps: Record<string, JSX.Element> = {
        FROM_TOP: <ArrowDownToLine className={'bg-red-500'}/>,
        FROM_DOWN: <ArrowUpToLine className={'bg-green-500'}/>,
        MIDDLE_UP: <ArrowsUpFromLine className={'bg-blue-500'}/>,
        MIDDLE_DOWN: <Network className={'bg-yellow-500'}/>,
    }

    console.log(orders)

    return <>
        {admin && <AddSearchWrapper setAdd={setAdd} watch={watch} text={'Додати розпорядження'}/>}
        <table
            className={'border border-collapse border-gray-200 mt-10 relative left-1/2 -translate-x-1/2 max-w-none w-max'}>
            <Header list={ordersHeader}/>
            <tbody>
            {orders.map((obj => <tr key={String(obj._id)}>
                <td className={'border px-1 py-1 flex text-center items-center font-bold'}>{typeMaps[obj.type]}</td>
                <td className={'border px-1 py-1 text-center max-w-60'}>{obj.description}</td>
                <td className={'border px-1 py-1 text-center'}>
                    {obj.type === 'FROM_TOP' && obj.unitsTop ? `А${departmentsNames[Object.keys(obj.unitsTop)[0]]}` : ''}
                </td>
                <td className={'border px-1 py-1 max-w-70'}>
                    {obj.type === 'FROM_TOP' ? getDocuments(obj, true) : ''}
                </td>
                <td className={'border px-1 py-1 text-center'}>{obj.type === 'FROM_TOP' ? obj.weUntil : ''}</td>
                <td onClick={() => handler(String(obj._id), 'FROM_TOP')}
                    className={'border px-1 py-1 '}>
                    {obj.type === 'FROM_TOP' && obj.unitsTop
                    ? getUnitsAnswer(obj.unitsTop, departmentsNames).map(el =>
                        <div key={el} className={el.includes('()') ? 'text-red-600' : ''}>
                            {el.replace('()', '')}
                        </div>)
                    : ''}
                </td>
                <td className={'border px-1 py-1 max-w-60 whitespace-pre-line'}>
                    {obj.type === 'FROM_TOP' || obj.type === 'MIDDLE_DOWN' ? getDocuments(obj, false) : ''}
                </td>
                <td onClick={() => handler(String(obj._id), 'MIDDLE_DOWN')}
                    className={'border px-1 py-1 whitespace-pre-line'}>
                    {obj.unitsDown
                        ? getUnitsAnswer(obj.unitsDown, departmentsNames).map(el =>
                            <div key={el} className={el.includes('()') ? 'text-red-600' : ''}>
                                {el.replace('()', '')}
                            </div>)
                        : ''}
                </td>
                <td className={'border px-1 py-1 text-center'}>
                    {obj.type === 'FROM_TOP' || obj.type === 'MIDDLE_DOWN' ? obj.subUntil : ''}
                </td>
            </tr>))}
            </tbody>
        </table>
        {currId && <ModalWrap onClose={close}>
            <ChangeUnitAnswer currId={currId} answerType={answerType} close={close} />
        </ModalWrap>}
    </>
}