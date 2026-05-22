import {PlusCircle} from 'lucide-react'

type Props = {
    setAdd: (value: string) => void,
    value: string
    text: string
}

export const AddCustomButton = ({setAdd, value, text}: Props) => {
    return (
        <div className={'flex cursor-default dark:text-gray-400'} onClick={() => setAdd(value)}>
            <PlusCircle/>
            <span
                className={'text-l ml-2 tracking-tight text-gray-900 dark:text-gray-400'}>{text}</span>
        </div>
    )
}