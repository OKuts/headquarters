import {useNavigation,} from 'react-router'
import {TaskInputForm} from '../components/tasks/TaskInputForm.tsx'
import React from 'react'
import {LogoKuts} from '../components/logo/LogoKuts.tsx'

export const AboutPage = () => {
    const navigation = useNavigation()

    const [isAdd, setIsAdd] = React.useState<boolean>(false)

    if (navigation.state === 'loading') return null

    return (
        <div>
            <LogoKuts/>
            {isAdd && <TaskInputForm setIsAdd={setIsAdd}/>}
        </div>
    )
}