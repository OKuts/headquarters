import kuts from '../../assets/kuts.svg'

export const LogoKuts = () => {
    return             <div className="container flex items-center">
        <img src={kuts} alt="Oleksandr Kuts" className={'h-20 w-20'}/>
        <div>
            <h3 className={'ml-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white'}>Oleksandr Kuts</h3>
            <span className={'ml-6'}>(мої завдання)</span>
        </div>
    </div>
}