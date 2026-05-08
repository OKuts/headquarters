import {useNavigation,} from 'react-router'
import {TaskInputForm} from '../components/tasks'
import {useState} from 'react'
import {LogoKuts} from '../components/logo'
import {DepartmentsList, InputEditDepartmentName} from '../components/department'

export const AboutPage = () => {
    const navigation = useNavigation()

    const [isAdd, setIsAdd] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)


    if (navigation.state === 'loading') return null

    return (
        <div>
            <LogoKuts setIsAdmin={setIsAdmin} isAdmin={isAdmin} setIsAdd={setIsAdd} />
            {isAdd && <TaskInputForm setIsAdd={setIsAdd}/>}
            {isEdit && <InputEditDepartmentName setIsEdit={setIsEdit} />}
            <DepartmentsList setIsAdd={setIsAdd} isAdmin={isAdmin}/>
        </div>
    )
}