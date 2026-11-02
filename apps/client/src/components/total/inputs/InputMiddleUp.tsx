import {type FieldValues, useForm} from 'react-hook-form'
import {ModalWrap} from '../ModalWrap.tsx'
import type {DocumentEmpty, IDepartmentByWeight} from '@headquarters/shared'
import {CustomCheckList} from './CustomCheckList.tsx'
import {InputDocument} from './InputDocument.tsx'
import {orderCreateApi} from '../../../api'
import {useOrdersStore} from '../../../store/useOrdersStore.ts'
import {userLogger} from '../../../utils/logger/logger.ts'

type Props = {
    type: string
    setAdd: (value: string) => void
    unitsTop: DocumentEmpty | object
    setUnitsTop: (units: DocumentEmpty) => void
    unitsDown: DocumentEmpty | object
    setUnitsDown: (units: DocumentEmpty) => void
    unitsByWeight: IDepartmentByWeight
    description: string
}

export const InputMiddleUp = (
    {setAdd, unitsTop, setUnitsTop, unitsDown, setUnitsDown, unitsByWeight, type, description}: Props) => {

    const {register, handleSubmit} = useForm()
    const {saveOrders} = useOrdersStore()

    const closeForm = (data: FieldValues) => {
        orderCreateApi({
            method: 'POST',
            data: {...data, type, description, unitsTop, unitsDown}
        }) // внести в базу
            .then(req => {
                orderCreateApi({method: 'GET', data: null})
                    .then(list => {
                        saveOrders(list.data)  // переписую стор
                        setUnitsTop({})
                        setUnitsDown({})
                    })
            })
        setAdd('')
    }

    const onSubmit = async (data: FieldValues) => {
        if (Object.keys(unitsTop).length > 0) {
            if (data.main && data.mainDate ) {
                closeForm(data)
            } else {
                userLogger.show('Не зазначені основні реквізити', 'error')
            }
        } else {
            userLogger.show('Не обрані адресати', 'error')
        }

    }

    return <ModalWrap onClose={() => setAdd('')}>
        <div
            className="m-auto w-full p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
            <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-5">
                <div>
                    <CustomCheckList label={'Надсилається запит (доповідь)'} units={unitsTop} setUnits={setUnitsTop}
                                     isChange={false} list={unitsByWeight?.top}/>
                    <InputDocument label={'Реєстраційні реквізити основні'} register={register} name={'main'}
                                   dateName={'mainDate'}/>
                    <InputDocument label={'Реєстраційний реквізити додаткові'} register={register} name={'add'}
                                   dateName={'addDate'}/>
                </div>

                <button type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    Далі
                </button>
            </form>
        </div>
    </ModalWrap>
}