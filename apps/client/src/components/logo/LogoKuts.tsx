import kuts from '../../assets/kuts.svg'
import React from 'react'

export const LogoKuts: React.FC = () => {


    return <div className="container flex items-center mb-2">
        <img src={kuts} alt="Oleksandr Kuts" className={'h-20 w-20'}/>
        <div>
            <h3 className={'ml-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white'}>Oleksandr Kuts</h3>
        </div>
    </div>
}