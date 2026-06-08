import {ModalWrap} from '../total'
import {useDepartmentsStore} from '../../store'
import {useMemo} from 'react'
import {useForm} from 'react-hook-form'
import {departmentsClientApi} from '../../api'
import {userLogger} from '../../utils/logger/logger'
import {getDepartment} from '../../utils/departments/getDepartment'
import {isCircleMainDepartment} from '../../utils/departments/isCircleMainDepartment'
import type {IDepartment} from '@headquarters/shared'

interface RadioProps {
    setIsRadioUnit: (value: boolean) => void;
}

export const DepartmentsRadio = ({setIsRadioUnit}: RadioProps) => {
    const {departments, currId, saveDepartmentName, updateDepartment, setCurrId} = useDepartmentsStore()
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {index: -1}})

    const availableMainDepartments = useMemo(() =>
            departments.filter(department => currId !== department._id)
        , [departments, currId])

    const onSubmit = async (data: { index: number }) => {
        const mainDepartment = availableMainDepartments[data.index]
        const currDepartment = getDepartment(currId, departments)

        if (mainDepartment && currDepartment ) {

            const isNotCircle = isCircleMainDepartment(currDepartment, mainDepartment, departments)

            if (isNotCircle) {
                if (!currDepartment.main || currDepartment.main !== mainDepartment._id) {

                    const result = await departmentsClientApi({
                        method: 'PATCH', _id: currId, data: mainDepartment, action: {main: 'update'}})
                    if (result) {
                        result.data.forEach((item: IDepartment) => {
                            if (item) {
                                updateDepartment(item)
                                saveDepartmentName({[item._id]: item.department})
                            }
                        })
                        setIsRadioUnit(false)
                        setCurrId('')
                        userLogger.show('Операція успішна', 'success')
                    }
                } else {
                    setIsRadioUnit(false)
                    setCurrId('')
                    userLogger.show('Ви намагались виконати операцію повторно', 'error')
                }
            } else {
                userLogger.show('Ви намагаєтесь створити циклічну підпорядкованість', 'error')
            }
        }
    }

    return (
        <ModalWrap onClose={() => setIsRadioUnit(false)} title={'Обрати старший підрозділ'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {availableMainDepartments.map((el, i) =>
                    <label key={el._id} htmlFor={el._id}
                           className="group flex items-center gap-3 cursor-pointer select-none py-1">
                        <div className="relative flex items-center justify-center">
                            {/* Прихований стандартний інпут */}
                            <input
                                type="radio"
                                id={el._id}
                                value={i}
                                {...register('index', {required: 'Оберіть один із варіантів'})}
                                className="peer sr-only"
                            />

                            {/* Кастомне коло (рамка) */}
                            <div className="h-5 w-5 rounded-full border-2 border-slate-300 bg-white
          transition-all duration-200
          peer-checked:border-blue-600 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400
          group-hover:border-slate-400">
                            </div>

                            {/* Точка всередині (з'являється при checked) */}
                            <div className="absolute h-2.5 w-2.5 rounded-full bg-blue-600
          scale-0 transition-transform duration-200
          peer-checked:scale-100">
                            </div>
                        </div>

                        <span
                            className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{el.department}</span>
                    </label>
                )}
                {errors.index && (
                    <p className="text-red-500 text-sm mt-2 font-medium">
                        {errors.index.message}
                    </p>
                )}
                <button type="submit" className="bg-blue-600 mt-5 text-white px-4 py-2 rounded">
                    Зберегти в базу
                </button>
            </form>
        </ModalWrap>
    )
}