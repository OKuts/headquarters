import {Fragment} from 'react'
import type {ActionType, MenuOption} from '../../types/contextMenuTypes.ts'
import {options, type TOptions} from '../../data'


type Props = {
    id: string
    main?: string
    onAction: (action: ActionType, id: string) => void
    optionList: MenuOption[]
    type: TOptions
}

// 2. Основний компонент
export const ActionSelect = ({onAction, main, id, optionList, type}: Props) => {

    return <div
        className="absolute right-0 mt-2 w-72 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
        <div className="py-1">
            {optionList.map((option, i) => <Fragment key={i}>
                {(((i !== 2 || main) && type === options.DEPARTMENTS) || type === options.WORKERS) &&
                    <button
                        onClick={() => {
                            onAction(option.value, id)
                        }}
                        className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${option.color || 'text-gray-700'}`}
                    >
                        <span className="mr-3">{option.icon}</span>
                        {option.label}
                    </button>}
            </Fragment>)}
        </div>
    </div>
}

