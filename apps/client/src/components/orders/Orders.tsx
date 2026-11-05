import {AddSearchWrapper} from '../../elements/AddSearchWrapper.tsx'
import {useAdminStore, useDepartmentsStore} from '../../store'
import {useEffect, useState} from 'react'
import {useOrdersStore} from '../../store/useOrdersStore.ts'
import {orderApi} from '../../api'
import {Header, ModalWrap} from '../total'
import {ordersHeader} from '../../data'
import {getDocuments, getUnitsAnswer} from '../../utils/orders'
import {ChangeUnitAnswer} from './ChangeUnitAnswer.tsx'
import {useSearchStore} from '../../store/useSearchStore.ts'
import {OrdersCell} from './OrdersCell.tsx'

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
    const {searchValue, setSearch} = useSearchStore()


    useEffect(() => {
        setSearch('')
    }, [setSearch])

    useEffect(() => {
        orderApi({method: 'GET', data: null})
            .then(list => {
                saveOrders(list.data)
            })
    }, [saveOrders])

    const outArr = orders.map(obj => ([
        obj._id,
        obj.type,
        obj.description,
        obj.type === 'FROM_TOP' && obj.unitsTop ? `А${departmentsNames[Object.keys(obj.unitsTop)[0]]}` : '',
        (obj.type === 'FROM_TOP' || obj.type === 'MIDDLE_UP') ? getDocuments(obj, true) : '',
        obj.weUntil ? obj.weUntil : '',
        (((obj.type === 'FROM_TOP' && obj.weUntil) || obj.type === 'MIDDLE_UP') && obj.unitsTop)
            ? getUnitsAnswer(obj.unitsTop, departmentsNames).map(el => el.replace('()', ''))
            : '',
        (obj.type === 'FROM_TOP' || obj.type === 'MIDDLE_DOWN') ? getDocuments(obj, false) : '',
        obj.unitsDown ? getUnitsAnswer(obj.unitsDown, departmentsNames).map(el => el.replace('()', '')) : '',
        (obj.type === 'FROM_TOP' || obj.type === 'MIDDLE_DOWN') && obj.subUntil ? obj.subUntil : '',
    ]))
    const filteredOrders = searchValue
        ? outArr.filter(line =>            line
            .some(el => el && typeof el === 'string' && el.includes(searchValue)))
            .reverse()
        : outArr.reverse()


    const handler = (_id: string, type: string) => {

        console.log(_id, type)
        setCurrId(_id)
        setAnswerType(type)
    }

    const close = () => {
        handler('', '')
        setAdd('')
    }

    console.log(filteredOrders)

    return <>
        {admin && <AddSearchWrapper setAdd={setAdd} watch={watch} text={'Додати розпорядження'}/>}
        <table
            className={'border border-collapse border-gray-200 mt-10 relative left-1/2 -translate-x-1/2 max-w-none w-max'}>
            <Header list={ordersHeader}/>
            <tbody>
            {filteredOrders.map((line, i) => <tr key={i}>
                {line.map((el, j) => j
                    ? <OrdersCell key={j} el={el} i={j} _id={line[0]} orderType={line[1]}
                                  handler={handler} n5={!!line[5]} n9={!!line[9]}/>
                    : <></>)}
            </tr>)}
            </tbody>
        </table>
        {currId && <ModalWrap onClose={close}>
            <ChangeUnitAnswer currId={currId} answerType={answerType} close={close}/>
        </ModalWrap>}
    </>
}