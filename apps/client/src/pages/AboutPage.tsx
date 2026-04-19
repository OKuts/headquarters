
import {useNavigation,} from 'react-router'
import {LogoKuts} from '../components/logoKuts/LogoKuts.tsx'
import {TaskInputForm} from '../components/tasks/TaskInputForm.tsx'

export const AboutPage = () => {
    const navigation = useNavigation()



    if (navigation.state === 'loading') return null

    return (
        <div>
            <LogoKuts/>
            <TaskInputForm/>
        </div>
    )
}