import {useAuthStore} from '../store'

export const Main = () => {
    const {user} = useAuthStore()

    return <>
        {user && <div>Main</div>}
    </>
}

