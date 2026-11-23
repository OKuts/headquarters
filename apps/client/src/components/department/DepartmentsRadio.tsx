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
            departments
                .filter(department => currId !== department._id)
                .sort((a,b) => a.department > b.department ? 1 : -1)
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
        <ModalWrap onClose={() => setIsRadioUnit(false)}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {availableMainDepartments.map((el: IDepartment, i: number) => (
                        <label key={el._id} htmlFor={el._id}
                            className="group flex items-center gap-3 cursor-pointer select-none px-3 py-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all duration-200"
                        >
                            <div className="relative flex items-center justify-center shrink-0">
                                <input
                                    type="radio"
                                    id={el._id}
                                    value={i}
                                    {...register('index', { required: 'Оберіть один із варіантів' })}
                                    className="peer sr-only"
                                />
                                <div className="h-5 w-5 rounded-full border-2 border-slate-600 bg-slate-900 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-500/10 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400 group-hover:border-slate-500"></div>
                                <div className="absolute h-2.5 w-2.5 rounded-full bg-blue-500 scale-0 transition-transform duration-200 peer-checked:scale-100"></div>
                            </div>
                            <span className="text-sm font-medium text-slate-300 group-hover:text-white truncate">
        {el.department}
      </span>
                        </label>
                    ))}
                </div>
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