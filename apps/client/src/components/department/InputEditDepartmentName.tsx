import {AlertCircle} from 'lucide-react'
import {useForm} from 'react-hook-form'
import type {IDepartmentUnit} from '@headquarters/shared'
import {departmentsClientApi} from '../../api'
import {useDepartmentsStore} from '../../store'
import {ModalWrap} from '../total/ModalWrap.tsx'

type Props = {
    setIsEdit: (isEdit: boolean) => void
}

export const InputEditDepartmentName = ({setIsEdit}: Props) => {
    const {currId, departments, saveDepartment, updateDepartment, setCurrId} = useDepartmentsStore()
    const {register, handleSubmit, formState: {errors},} = useForm<IDepartmentUnit>({
        mode: 'onTouched', // Помилка з'явиться відразу після взаємодії
        defaultValues: {department: currId ? departments.filter(el => el._id === currId)[0].department : ''}
    })

    const onClose = () => {
        setIsEdit(false)
        setCurrId('')
    }

    const onSubmit = async (formData: IDepartmentUnit) => {
        const send = currId
            ? {method: 'PATCH', _id: currId,  data: {...formData}}
            : {method: 'POST', _id: '', data: {...formData}}
        const {data} = await departmentsClientApi(send)
        if (currId) {
            updateDepartment(data)
        } else {
            saveDepartment(data)
        }
        onClose()
    }


    return (
        <ModalWrap onClose={onClose} title={'Назва підрозділу'}>
            <div className="relative p-6 border rounded-xl bg-white shadow-lg max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Введіть назву
                        </label>

                        <input
                            {...register('department', {

                                required: 'Це поле є обов’язковим',
                                minLength: {
                                    value: 3,
                                    message: 'Назва має бути не менше 3 символів'
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Назва не може перевищувати 50 символів'
                                }
                            })}
                            className={`w-full text-blue-600 p-2 border rounded-md outline-none transition-all ${
                                errors.department ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:ring-1 focus:ring-blue-500'
                            }`}
                            placeholder="Наприклад: Відділ кадрів"
                        />

                        {/* Вивід повідомлення про помилку */}
                        {errors.department && (
                            <div
                                className="flex items-center mt-2 text-red-600 text-sm animate-in fade-in slide-in-from-top-1">
                                <AlertCircle size={16} className="mr-1"/>
                                <span>{errors.department.message}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-md hover:bg-gray-50 text-sm"
                        >
                            Скасувати
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                        >
                            {currId ? 'Змінити назву' : 'Додати підрозділ'}
                        </button>
                    </div>
                </form>
            </div>
        </ModalWrap>
    )
}

