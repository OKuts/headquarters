import {useNavigation,} from 'react-router'
import kuts from '../assets/kuts.svg'

export const AboutPage = () => {
    const navigation = useNavigation()

    if (navigation.state === 'loading') return null

    return (
        <div className={'flex flex-col gap-20 justify-center items-center min-h-[calc(100vh-5rem)]'}>
            <img src={kuts} alt="Oleksandr Kuts" className={'max-w-50'} />
            <p className={'text-3xl'}>my workspace</p>
        </div>
    )
}