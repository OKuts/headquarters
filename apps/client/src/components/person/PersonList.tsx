import {useState} from 'react'
import {AddSearchWrapper} from '../../elements/AddSearchWrapper.tsx'

type Props = {
    setAdd: (isAdd: string) => void
    watch: string
}

export const PersonList = ({setAdd, watch}: Props) => {
    const [searchTerm, setSearchTerm] = useState('')


    return <AddSearchWrapper setSearchTerm={setSearchTerm} setAdd={setAdd} value={watch} text={'Персонал'}/>
}