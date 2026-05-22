import {type FieldValues, useForm} from 'react-hook-form'
import { User, UserKey} from 'lucide-react'
import {personsClientApi} from '../../api/personClientApi.ts'
import {ModalWrap} from '../total/ModalWrap.tsx'

type Props = {
    setAdd: (value: string) => void,
}

export const InputPersonName = ({setAdd}: Props) => {

    const {register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = async (data: FieldValues) => {
        personsClientApi(data)
            .then(response => {
                console.log(response)
                setAdd('')
            })
    }

    return (
        <ModalWrap onClose={()=>setAdd('')} title={'Додати співробітника'}>
        <div
            className="m-auto w-full max-w-md p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">

            <form onSubmit={handleSubmit((data) => onSubmit(data))}
                  className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">РНОКПП (паспорт)</label>
                        <div className="relative">
                            <UserKey className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                            <input
                                {...register('inn', {
                                    required: 'Дані обов\'язкові',
                                    pattern: {value: /.{8,10}/i, message: 'Від 8 до 10 символів'}
                                })}
                                type="text"
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="inn/passport"/>
                        </div>
                        {errors.inn &&
                            <span className="text-red-500 text-xs mt-1">{errors.inn.message as string}</span>}
                    </div>
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Прізвище,
                            ім'я та по-батькові</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                            <input
                                {...register('name', {
                                    required: 'ПІБ обов\'язкові',
                                    pattern: {value: /.{4,}/i, message: 'Від 4 символів'}
                                })}
                                type="text"
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="kuts"/>
                        </div>
                        {errors.name &&
                            <span className="text-red-500 text-xs mt-1">{errors.name.message as string}</span>}
                    </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    Додати
                </button>
            </form>
        </div>
        </ModalWrap>
    )
}