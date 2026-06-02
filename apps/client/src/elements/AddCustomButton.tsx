import {PlusCircle} from 'lucide-react'

type Props = {
    setAdd: (value: string) => void,
    watch: string
    text: string
}

export const AddCustomButton = ({setAdd, watch, text}: Props) => {

    // console.log('AddCustomButton', value, text)

    return (
        <div className={'flex cursor-default dark:text-gray-400'} onClick={() => setAdd(watch)}>
            <PlusCircle/>
            <span
                className={'text-l ml-2 tracking-tight text-gray-900 dark:text-gray-400'}>{text}</span>
        </div>
    )
}