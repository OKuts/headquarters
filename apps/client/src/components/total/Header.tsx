import type {THeader} from '../../types'

type Props = {
    list: THeader
}

export const Header = ({list}: Props) => {
    return <thead>
    {list.map((item, j) =>
        <tr key={j}>
            {item.map((el, i) =>
                <th key={i} rowSpan={el[1]} colSpan={el[2]} className={'px-4 py-2 text-center border'}>
                    {el[0]}
                </th>)}
        </tr>
    )}
    </thead>
}