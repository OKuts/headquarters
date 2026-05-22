import {AddCustomButton} from './AddCustomButton.tsx'
import {SearchInput} from './SearchInput.tsx'

type Props = {
    setSearchTerm: (value: string) => void
    setAdd: (value: string) => void,
    value: string
    text: string
}

export const AddSearchWrapper = ({setSearchTerm, setAdd, value, text}: Props) => {

    return <div className={'flex justify-between items-center w-full mb-2'}>
        <AddCustomButton setAdd={setAdd} value={value} text={text}/>
        <SearchInput setSearchTerm={setSearchTerm}/>
    </div>
}