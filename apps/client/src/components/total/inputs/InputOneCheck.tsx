export const InputOneCheck = ({register}) => {


    return <div>
        <label
            className="py-5 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 cursor-pointer flex items-center gap-3">
            <input
                {...register('isSub')}
                type="checkbox"
                className="peer sr-only"
            />
            <span>Завдання підлеглим частинам</span>
            <div
                className="w-5 h-5 rounded border border-slate-600 bg-slate-800 peer-checked:bg-blue-600 peer-checked:border-blue-500 peer-checked:[&_svg]:opacity-100 transition-all flex items-center justify-center">
                {/* Іконка галочки */}
                <svg className="w-3.5 h-3.5 text-white opacity-0 transition-opacity" fill="none"
                     stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
            </div>
        </label>
    </div>
}