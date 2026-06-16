import {ModalWrap} from '../total'
import {ERoles} from '@headquarters/shared/models/UserModel.ts'
import {useAuthStore, useDepartmentsStore} from '../../store'
import {type FieldValues, useForm} from 'react-hook-form'

type Props = {
    onClose: () => void,
}

export const ChangeRole = ({onClose}: Props) => {
    const {user} = useAuthStore()
    const {departments} = useDepartmentsStore()
    const {register, handleSubmit, formState: {errors}} = useForm()

    const handler = (data: FieldValues) => {
        console.log(data, user)
        onClose()
    }

    return <ModalWrap onClose={onClose} title={'Нова роль'}>
        <form onSubmit={handleSubmit((data) => handler(data))}
              className="space-y-5">
                {/* Select: Підрозділ */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Підрозділ
                    </label>
                    <select
                        {...register('department', {required: 'Оберіть підрозділ'})}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200
                        dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none text-slate-900 dark:text-white"
                    >
                        <option value="">Оберіть . . .</option>
                        {departments.map(el => <option key={el._id} value={el._id}>{el.department}</option>)}
                    </select>
                    {errors.department && (
                        <span className="text-red-500 text-xs mt-1">{errors.department.message as string}</span>
                    )}
                </div>

                {/*Radio Group*/}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Ваша роль
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {Object.values(ERoles).map((option) => (
                            <label key={option} className="relative flex cursor-pointer">
                                <input
                                    {...register('role', {required: 'Оберіть тип посади'})}
                                    type="radio"
                                    value={option}
                                    className="peer sr-only"/>
                                <div
                                    className="w-full text-center py-2 px-3 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 peer-checked:text-blue-600 dark:peer-checked:text-blue-400 transition-all hover:bg-slate-100 dark:hover:bg-slate-700">
                                    {option}
                                </div>
                            </label>
                        ))}
                    </div>
                    {errors.role && (
                        <span className="text-red-500 text-xs mt-1">{errors.role.message as string}</span>
                    )}
                </div>
            <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
                Змінити
            </button>
        </form>
    </ModalWrap>
}