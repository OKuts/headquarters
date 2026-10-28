import {AddSearchWrapper} from '../../elements/AddSearchWrapper.tsx'
import {useAdminStore} from '../../store'

type Props = {
    setAdd: (isAdd: string) => void
    watch: string
}

export const Sub = ({setAdd, watch}: Props) => {
    const {admin} = useAdminStore()

    return <>
        {admin && <AddSearchWrapper setAdd={setAdd} watch={watch} text={'Додати відправлене розпорядження'}/>}
    </>
}