import {useEffect, useState} from 'react'
import {useSearchStore} from '../../store'
import type {Properties} from '@headquarters/shared/models/PropsModel'
import {ModalWrap} from '../total'

export const Prop = () => {
    const {searchValue, setSearch} = useSearchStore()
    const [propData, setPropData] = useState<Properties>({})
    const [modalData, setIsModalData] = useState({show: false, key: '', value: '', description: ''})

    useEffect(() => {
        const url = import.meta.env.VITE_API_URL
        setSearch('')
        fetch(`${url}/api/properties`)
            .then(res => res.json())
            .then(data => {
                if (data.data[''].data.length) {
                    setPropData(data.data[''].data.reduce((acc, el) => ({
                        ...acc,
                        [el[0]]: {name: el[1], description: el[2] || ''}
                    }), {}))
                }
            })
    }, [setSearch])

    const handler = (key: string) => {
        if (propData[key].description)
            setIsModalData({show: true, key, value: propData[key].name, description: propData[key].description})
    }

    const filteredPropData = searchValue
        ? Object.entries(propData).map(([key, value]) => [key, ...Object.values(value)])
            .filter(line => line[0].includes('.0') || line.some(el => el.toLowerCase().includes(searchValue.toLowerCase())))
        : Object.entries(propData).map(([key, value]) => [key, ...Object.values(value)])

    console.log(propData)

    return <>
        <table
            className={'border border-collapse border-gray-200 mt-10 relative left-1/2 -translate-x-1/2 max-w-none w-max'}>
            <tbody>
            {filteredPropData.map((line, i) => <tr key={i} onClick={() => handler(line[0])}>
                {line.map((el, j) => j < line.length - 1
                    ? <td key={j}
                          className={`border max-w-200 px-1 pl-2 py-1 whitespace-pre-line 
                        ${line[0].length < 6 ? 'bg-blue-700' : ''}
                        ${line[0].split('_').length === 3 ? 'pl-10' : ''}`}>
                        {el}
                    </td>
                    : <></>
                )}
            </tr>)}
            </tbody>
        </table>

        {modalData.show &&
            <ModalWrap onClose={() => setIsModalData({show: false, key: '', value: '', description: ''})}>
                <div className={'p-10 max-w-120 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white'}>
                    <p className={'pb-10 font-bold'}>{modalData.value}</p>
                    <p className={'pb-10 font-bold'}>{`${modalData.key} ${propData[modalData.key.split('.')[0] + '.0'].name}`}</p>
                    <p>{modalData.description}</p>
                </div>
            </ModalWrap>
        }
    </>
}