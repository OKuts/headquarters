import {useAuthStore} from '../store'

export const Work = () => {
    const {user} = useAuthStore()

    return <>
        {user && <div>Work</div>}
    </>
}