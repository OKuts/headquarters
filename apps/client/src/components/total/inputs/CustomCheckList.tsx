import type {DocumentEmpty, KeyString} from '@headquarters/shared'


type Props = {
    label: string
    list: KeyString
    units: DocumentEmpty | object
    setUnits: (unit: { [key: string]: null }) => void
    isChange: boolean
}

export const CustomCheckList = ({label, list, units, setUnits, isChange}: Props) => {

    const handler = (key: string) => {

        const temp = {...units}
        if (key in temp) {
            delete temp[key]
        } else {
            temp[key] = null
        }
        setUnits(isChange ? {[key]: null} : temp)
    }

    const getCn = (is: boolean) => {
        const base = 'inline-block mr-5 my-2 border px-2 py-1 rounded-lg'
        return is ? base + ' bg-blue-600' : base
    }

    return <div className={'flex flex-col text-gray-900 dark:text-white'}>
        <div className={'py-5'}>{label}</div>
        <div>
            {Object.entries(list)
                .sort((a, b) => a[1] > b[1] ? 1 : -1)
                .map(([key, item]) => <span
                    className={getCn(Object.keys(units).includes(key))}
                    onClick={() => handler(key)}
                    key={key}>
            {`А${item.slice(0, 4)}`}
        </span>)}
        </div>
    </div>
}