import kuts from '../../assets/kuts.svg'
import React, {useState} from 'react'
import {PasswordConfirm} from './PasswordConfirm.tsx'
import {CreateDepartment} from './CreateDepartment.tsx'
import {PlusCircle} from 'lucide-react'
import {DepartmentsList} from './DepartmentsList.tsx'

export const LogoKuts: React.FC = () => {
    const [into, setInto] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [isAdd, setIsAdd] = useState<boolean>(false)


    console.log(isAdmin)
    return <>
        <div className="container flex items-center mb-2" onClick={(()=>setInto(true))}>
            <img src={kuts} alt="Oleksandr Kuts" className={'h-20 w-20'}/>
            <div>
                <h3 className={'ml-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white'}>Oleksandr
                    Kuts
                    {isAdmin && <span className={'text-blue-600'}>
                         {' (admin)'}
                    </span>}
                </h3>
            </div>
        </div>
        {into && !isAdmin && <PasswordConfirm onSuccess={setIsAdmin} onCancel={setInto}/>}
        {isAdmin && <>
            <div className={'flex'} onClick={() => setIsAdd(true)}>
                <PlusCircle/>
                <span className={'text-xl ml-2 font-bold tracking-tight text-gray-900 dark:text-white'}>Add unit</span>
            </div>


            {isAdd && <CreateDepartment setIsAdd={setIsAdd}/>}
            <DepartmentsList departments={[
                {
                    _id: '1',
                    department: 'IT Департамент',
                    main: 'Олександр Сидоренко',
                    employeesCount: 24,
                    sub: ['it@company.com']
                },
                {
                    _id: '2',
                    department: 'Відділ Маркетингу',
                    main: 'Марія Іванова',
                    employeesCount: 12,
                    sub: ['marketing@company.com', 'it@company.com']
                }
            ]}/>
        </>}

    </>
}