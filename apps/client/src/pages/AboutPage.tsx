import {useNavigation,} from 'react-router'

export const AboutPage = () => {
    const navigation = useNavigation()

    if (navigation.state === 'loading') return null

    return (
        <div>
            About
        </div>
    )
}