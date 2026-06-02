import {ERoles} from '@headquarters/shared/models/UserModel.ts'

type Props = {
    workers?: string[]
    boss?: string
    text: ERoles
}

export const Worker = ({workers, boss, text}: Props) => {

    return <>
            {boss && <div className={'flex'}>
                <span className={'flex min-w-25 '}>{text}</span>
                <span className={'flex  text-blue-600 font-semibold'}>{boss}</span>
            </div>}
            {workers && workers.map(sub =>  <div className={'flex'}>
                <span className={'flex min-w-25 '}>{text}</span>
                <span className={'flex text-blue-600 font-semibold'}>{sub}</span>
            </div>)}
    </>
}