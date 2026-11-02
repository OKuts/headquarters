export const CustomCheckList = ({label, list, units, setUnits, isChange}) => {

    const handler = (key: string) => {

        const temp = {...units}
        if (temp[key]) {
            delete temp[key]
        } else {
            temp[key] = null
        }
        isChange ? setUnits({[key]: null}) : setUnits(temp)
    }

    const getCn = (is: boolean) => {
        const base = 'inline-block mr-5 my-2 border px-2 py-1 rounded-lg'
        return is ? base + ' bg-blue-600' : base
    }

    return <div className={'flex flex-col text-gray-900 dark:text-white'}>
        <div className={'py-5'}>{label}</div>
        <div>
            {Object.entries(list).map(([key, item]) => <span
                className={getCn(Object.keys(units).includes(key))}
                onClick={() => handler(key)}
                key={key}>
            {`А${item.slice(0, 4)}`}
        </span>)}
        </div>
    </div>
}