import type {UseFormRegisterReturn} from 'react-hook-form'

interface RadioProps {
    label: string;
    value: string;
    register: UseFormRegisterReturn;
    id: string;
}

export const DepartmentsRadio = ({ label, value, register, id }: RadioProps) => {
    return (
        <label htmlFor={id} className="group flex items-center gap-3 cursor-pointer select-none py-1">
            <div className="relative flex items-center justify-center">
                {/* Прихований стандартний інпут */}
                <input
                    type="radio"
                    id={id}
                    value={value}
                    {...register}
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

            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
        {label}
      </span>
        </label>
    )
}