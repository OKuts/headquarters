export const InputBetween = ({register, errors, list, requiredText, label, regName}) => {


    return <>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {label}
        </label>
        <div className="grid grid-cols-3 gap-3">
            {list.map((option: string) => (
                <label key={option} className="relative flex cursor-pointer">
                    <input
                        {...register(regName, {required: requiredText})}
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
        {errors.source && (
            <span className="text-red-500 text-xs mt-1">{errors.source.message as string}</span>
        )}
    </>
}