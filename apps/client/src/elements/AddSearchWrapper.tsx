import {AddCustomButton} from './AddCustomButton.tsx'
import {SearchInput} from './SearchInput.tsx'
import {useAdminStore} from '../store'

type Props = {
    setSearchTerm: (value: string) => void
    setAdd: (value: string) => void,
    watch: string
    text: string
}

export const AddSearchWrapper = ({setSearchTerm, setAdd, watch, text}: Props) => {
    const {admin} = useAdminStore()

    return <div className={'flex justify-between items-center w-full mb-2'}>
        {admin && watch !== 'all' ? <AddCustomButton setAdd={setAdd} watch={watch} text={text}/> : <div/>}
        <SearchInput setSearchTerm={setSearchTerm}/>
    </div>
}