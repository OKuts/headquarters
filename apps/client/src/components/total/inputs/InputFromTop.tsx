import {type FieldValues, useForm} from 'react-hook-form'
import {ModalWrap} from '../ModalWrap.tsx'
import type {DocumentEmpty, IDepartmentByWeight} from '@headquarters/shared'
import {CustomCheckList} from './CustomCheckList.tsx'
import {InputOneCheck} from './InputOneCheck.tsx'
import {useState} from 'react'
import {InputDocument} from './InputDocument.tsx'
import {DateInput} from './DateInput.tsx'
import {Calendar} from 'lucide-react'
import {userLogger} from '../../../utils/logger/logger.ts'
import {orderApi} from '../../../api'
import {useOrdersStore} from '../../../store/useOrdersStore.ts'

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

export const InputFromTop = (
    {setAdd, unitsTop, setUnitsTop, unitsDown, setUnitsDown, unitsByWeight, type, description}: Props) => {

    const {register, handleSubmit} = useForm()
    const {saveOrders} = useOrdersStore()

    const [isDown, setIsDown] = useState<boolean>(false)
    const [isReq, setIsReq] = useState<boolean>(false)
    const [step, setStep] = useState(0)

    const closeForm = async (data: FieldValues) => {
        orderApi({method: 'POST',
            data: {...data, type, description, unitsTop, unitsDown}}) // внести в базу
            .then(() => {orderApi({method: 'GET', data: null})
                .then(list => {saveOrders(list.data)})  // переписую стор
            })
        setAdd('')
    }

    const onSubmit = async (data: FieldValues) => {
        switch (step) {
            case 0:
                if (data.main && data.mainDate && Object.keys(unitsTop).length > 0) {
                    if (isDown) {
                        setStep(1)
                    } else {
                        await closeForm(data)
                        setUnitsTop({})
                        setUnitsDown({})
                    }
                } else {
                    if (!Object.keys(unitsTop).length) userLogger.show('Видавник не вибраний', 'error')
                    if (!data.main || !data.mainDate) userLogger.show('Не зазначені основні реквізити', 'error')
                }
                break
            case 1:
                setStep(2)
                break
            case 2:
                if (data.mainDown && data.mainDownDate) {
                    await closeForm(data)
                    setUnitsTop({})
                    setUnitsDown({})
                }
                break
        }
    }

    return <ModalWrap onClose={() => setAdd('')}>
            <div
                className="m-auto w-full p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
                <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-5">
                    {step === 0 && <div>
                        <CustomCheckList label={'Видавник розпорядження'} units={unitsTop} setUnits={setUnitsTop}
                                         isChange={true} list={unitsByWeight?.top}/>
                        <InputDocument label={'Реєстраційні реквізити основні'} register={register} name={'main'}
                                       dateName={'mainDate'}/>
                        <InputDocument label={'Реєстраційний реквізити додаткові'} register={register} name={'add'}
                                       dateName={'addDate'}/>

                        <div className={'flex'}>
                            <InputOneCheck value={isReq} setValue={setIsReq} label={'Вимагається відповідь'}/>
                            {isReq && <DateInput label="Доповісти" name="weUntil" register={register}
                                                 icon={<Calendar size={20}/>}/>}
                        </div>

                        <div className={'flex'}>
                            <InputOneCheck value={isDown} setValue={setIsDown}
                                           label={'Підлеглим частинам'}/>
                            {isDown && <DateInput label="Отримати доповідь" name="subUntil" register={register}
                                                  icon={<Calendar size={20}/>}/>}
                        </div>
                    </div>}
                    {step === 1 && <div>
                        <div className={'text-slate-800 dark:text-white'}>До підлеглих частин</div>
                        <InputDocument label={'Реєстраційні реквізити основні'} register={register}
                                       name={'mainDown'}
                                       dateName={'mainDownDate'}/>
                        <InputDocument label={'Реєстраційний реквізити додаткові'} register={register}
                                       name={'addDown'}
                                       dateName={'addDownDate'}/>
                    </div>}
                    {step === 2 && <div>
                        <div className={'text-slate-800 dark:text-white'}>
                            Обрати частини до яких направлено розпорядження
                        </div>
                        <CustomCheckList
                            label={'З особовими рахунками'}
                            units={unitsDown}
                            isChange={false}
                            setUnits={setUnitsDown}
                            list={unitsByWeight?.count}/>
                        <CustomCheckList
                            label={'Мають служби без особових'}
                            units={unitsDown}
                            isChange={false}
                            setUnits={setUnitsDown}
                            list={unitsByWeight?.notCount}/>
                        <CustomCheckList
                            label={'Придані'}
                            units={unitsDown}
                            isChange={false}
                            setUnits={setUnitsDown}
                            list={unitsByWeight?.other}/>
                        <CustomCheckList
                            label={'Не мають служб'}
                            units={unitsDown}
                            isChange={false}
                            setUnits={setUnitsDown}
                            list={unitsByWeight?.notNot}/>
                    </div>}

                    <button type="submit"
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        Далі
                    </button>
                </form>
            </div>
        </ModalWrap>
}