import {useNavigation,} from 'react-router'
import {DepartmentsList} from '../components/department'
import {useAuthStore} from '../store'

export const AboutPage = () => {
    const navigation = useNavigation()
    const {user} = useAuthStore()

    if (navigation.state === 'loading') return null

    return (
        <div>
            About
            {user && <DepartmentsList setIsEdit={()=>{}}/>}
        </div>
    )
}