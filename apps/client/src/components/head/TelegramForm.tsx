import {type FieldValues, useForm} from 'react-hook-form'
import {ModalWrap} from '../total'
import {ELevel, type IDepartmentByWeight} from '@headquarters/shared'
import {useEffect, useState} from 'react'
import {CustomCheckList, DateInput, InputBetween, InputDocument, InputOneCheck} from '../total/inputs'
import {Calendar} from 'lucide-react'
import {useDepartmentsStore} from '../../store'
import {getUnitsByWeight} from '../../utils/departments'
import {userLogger} from '../../utils/logger/logger.ts'

type Props = {
    setAdd: (value: string) => void,
}

export const TelegramForm = ({setAdd}: Props) => {

    const {register, handleSubmit, formState: {errors}} = useForm()
    const {departments, departmentsNames} = useDepartmentsStore()

    const [source, setSource] = useState({})
    const [units, setUnits] = useState({})
    const [step, setStep] = useState(0)
    const [unitsByWeight, setUnitsByWeight] = useState<IDepartmentByWeight | null>(null)

    const close = (data) => {
        setSource(data)
        // внести в базу
        // setAdd('') // закриваю модальне вікно
    }

    const onSubmit = async (data: FieldValues) => {
        switch (step) {
            case 0:
                if (data.source && data.source === 'Head') {
                    setStep(1)
                    setSource(data)
                } else {
                    setSource({...data, isSub: true})
                    setStep(3)
                }
                break
            case 1:
                if (!Object.keys(units).length) {
                    userLogger.show('Оберіть частину ініціатор', 'error')
                } else {
                    if (data.source && data.source === 'Head') {
                        setSource({...data, top: units})
                        setUnits({})
                        setStep(2)
                    }
                }
                break

            case 2:
                if ((data.sedo && data.sedoDate) || (data.add && data.addDate)) {
                    if (data.weTo) {
                        setStep(3)
                        setSource({...source, ...data})
                        if (!data.isSub) setAdd('')
                    }
                } else {
                    userLogger.show('Треба перевірити заповнення полів', 'error')
                }
                break

            case 3:
                if (data.subTo && Object.keys(units).length) {
                    close({...source, ...data, sub: units})
                } else {
                    userLogger.show('Треба перевірити заповнення полів', 'error')
                }
                break
        }

    }

    useEffect(() => {
        setUnitsByWeight(getUnitsByWeight(departmentsNames, departments))
    }, [departmentsNames, departments])


    useEffect(() => {
        console.log(source)
    }, [source])

    return (
        <ModalWrap onClose={() => setAdd('')}>
            <div
                className="m-auto w-full p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
                <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-5">
                    {/*Radio Group*/}
                    {step === 0 && <div>

                        <InputBetween
                            errors={errors}
                            register={register}
                            list={Object.values(ELevel)}
                            label={'Джерело'}

                            requiredText={'Оберіть ініціатора розпорядження'}/>
                        {errors.source &&
                            <span className="text-red-500 text-xs mt-1">{errors.source.message as string}</span>}
                    </div>}

                    {step === 1 && <>
                        <CustomCheckList
                            label={'Топ'}
                            units={units}
                            setUnits={setUnits}
                            isChange={true}
                            list={unitsByWeight?.top}/>
                        <InputOneCheck register={register}/>
                    </>}


                    {source && step === 2 && <div>
                        <div className={'flex py-4 gap-4'}>

                            <InputDocument
                                label={'Реквізити СЕДО'}
                                register={register}
                                name={'sedo'}/>

                            <DateInput
                                label="Дата документу"
                                name="sedoDate"
                                register={register}
                                icon={<Calendar size={20}/>}
                            />
                        </div>
                        <div className={'flex py-4 gap-4'}>

                            <InputDocument label={'Реєстрація'} register={register} name={'add'}/>
                            <DateInput
                                label="Дата документу"
                                name="addDate"
                                register={register}
                                icon={<Calendar size={20}/>}
                            />
                        </div>

                        <DateInput
                            label="Надати відповідь"
                            name="weTo"
                            register={register}
                            icon={<Calendar size={20}/>}/>
                    </div>}

                    {step === 3 && source && source.isSub && <div>
                        <div className={'flex py-4 gap-4'}>
                            <InputDocument label={'Розпорядження'} register={register} name={'sedoDown'}/>
                            <DateInput
                                label="Дата документу"
                                name="sedoDownDate"
                                register={register}
                                icon={<Calendar size={20}/>}
                            />
                        </div>
                        <DateInput
                            label="Отримати відповіді від частин"
                            name="subTo"
                            register={register}
                            icon={<Calendar size={20}/>}/>
                        <CustomCheckList
                            label={'З особовими рахунками'}
                            units={units}
                            isChange={false}
                            setUnits={setUnits}
                            list={unitsByWeight?.count}/>
                        <CustomCheckList
                            label={'Мають служби без особових'}
                            units={units}
                            isChange={false}
                            setUnits={setUnits}
                            list={unitsByWeight?.notCount}/>
                        <CustomCheckList
                            label={'Придані'}
                            units={units}
                            isChange={false}
                            setUnits={setUnits}
                            list={unitsByWeight?.other}/>
                        <CustomCheckList
                            label={'Не мають служб'}
                            units={units}
                            isChange={false}
                            setUnits={setUnits}
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
    )
}