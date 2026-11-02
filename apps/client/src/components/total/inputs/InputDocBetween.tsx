import {type FieldValues, useForm} from 'react-hook-form'
import {InputDescription} from './InputDescription.tsx'

type Props = {
    list:  string[]
    handler: (data: {type: string, description: string}) => void
    label: string
}


export const InputDocBetween = ({list, label, handler}: Props) => {

    const {register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = async (data: FieldValues) => {
        // const key = Object.entries(ELevel).find(([_, val]) => val === data.type)?.[0]
        handler(data as {type: string, description: string})
    }

    return <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-5">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {label}
        </label>
        <div className="grid grid-cols-3 gap-3">
            {list.map((option: string) => (
                <label key={option} className="relative flex cursor-pointer">
                    <input
                        {...register('type', {required: 'Оберіть Джерело документа'})}
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
        {errors.type && (
            <span className="text-red-500 text-xs mt-1">{errors.type.message as string}</span>
        )}

        <InputDescription
            register={register}
            name={'description'}
            label={'Короткий зміст документу'}/>

        <button type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
            Обрати
        </button>
    </form>
}