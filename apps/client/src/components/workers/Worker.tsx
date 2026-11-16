import {ERoles} from '@headquarters/shared/models/UserModel.ts'
import {ModalWrap} from '../total'
import {useState} from 'react'

type Props = {
    workers?: string[][]
    boss?: string[]
    text: ERoles
}

export const Worker = ({workers, boss, text}: Props) => {

    const [isModal, setIsModal] = useState<boolean>(false)
    const [show, setShow] = useState<string[]>([])

    const handler = (value : string[]) => {
        setIsModal(true)
        setShow(value)
    }

    return <>
            {boss && <div className={'flex'} onClick={() => handler(boss)}>
                <span className={'flex min-w-25 '}>{text}</span>
                <span className={'flex  text-blue-600 font-semibold'}>{boss[0]}</span>
            </div>}
            {workers && workers.map((sub, i) =>  <div className={'flex'} key={i} onClick={() => handler(sub)}>
                <span className={'flex min-w-25 '}>{text}</span>
                <span className={'flex text-blue-600 font-semibold'}>{sub[0]}</span>
            </div>)}
        {isModal && <ModalWrap onClose={() => setIsModal(false)}>
            <div className="p-8 bg-slate-500 text-2xl ">
                <p className={'pb-5 font-bold'}>{show[0]}</p>
                <p>{show[1]}</p>
            </div>
        </ModalWrap>}
    </>
}