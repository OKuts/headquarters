import {useOrdersStore} from '../../store/useOrdersStore.ts'
import {CustomCheckList, InputDocument} from '../total/inputs'
import {useState} from 'react'
import type {DocumentEmpty} from '@headquarters/shared'
import {useDepartmentsStore} from '../../store'
import {type FieldValues, useForm} from 'react-hook-form'
import {userLogger} from '../../utils/logger/logger.ts'
import {orderApi} from '../../api'

type Props = {
    close: () => void
    currId: string
    answerType: string
}

export const ChangeUnitAnswer = ({close, currId, answerType}: Props) => {
    const {handleSubmit, register} = useForm()
    const {orders, saveOrders} = useOrdersStore()
    const {departmentsNames} = useDepartmentsStore()

    const [unitData, setUnitData] = useState<DocumentEmpty | object>({})

    const curOrder = orders.filter(({_id}) => _id === currId)[0]
    const label = answerType === 'FROM_TOP' ? 'Наша відповідь' : 'Отримана доповідь'
    const temp = answerType === 'FROM_TOP' ? {...curOrder.unitsTop} : {...curOrder.unitsDown}
    const list = Object.keys(temp).reduce((res, el) => ({...res, [el]: departmentsNames[el]}), {})
    const unit = answerType === 'FROM_TOP' ? `А${departmentsNames[Object.keys(list)[0]]}` : ''

    const saveChange = async (value) => {
        orderApi({method: 'POST', data: {...value, _id: currId}}, 'order_change') // внести зміни в базу
            .then(() => {orderApi({method: 'GET', data: null})
                .then(list => {saveOrders(list.data)})  // переписую стор
            })
    }


    const onSubmit = async (data: FieldValues) => {
        if (data.answerNum && data.answerDate) {
            if (answerType === 'FROM_TOP' || Object.keys(unitData).length > 0) {

                if (answerType === 'FROM_TOP' && curOrder.unitsTop) {
                    const key = Object.keys(list)[0]
                    saveChange({unitsTop: {[key] : {num: data.answerNum, date: data.answerDate}}})
                } else {
                    // const key = Object.keys(list)[0]
                    saveChange({unitsDown: {...curOrder.unitsDown, [Object.keys(unitData)[0]]: {num: data.answerNum, date: data.answerDate}}})
                }
                close()
            }  else {
                userLogger.show('Не обраний відправник', 'error')
            }
        } else {
            userLogger.show('Не зазначені основні реквізити', 'error')
        }
    }

    return <div
        className="m-auto w-full p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-5">
            {answerType === 'MIDDLE_DOWN'
                ? <CustomCheckList
                    label={label}
                    units={unitData}
                    isChange={true}
                    setUnits={setUnitData}
                    list={list}/>
                : <span className={'inline-block text-slate-800 dark:text-white pb-3'}>{`Відправлено до ${unit}`}</span>
            }
            <InputDocument label={'Реєстраційні реквізити основні'} register={register} name={'answerNum'}
                           dateName={'answerDate'}/>
            <button type="submit"
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
                Внести зміни
            </button>
        </form>
    </div>
}