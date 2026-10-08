import {useAuthStore} from '../store'

export const Prop = () => {
    const {user} = useAuthStore()

    return <>
        {user && <div>Prop</div>}
    </>
}