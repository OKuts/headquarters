import {ERoles} from '@headquarters/shared/models/UserModel.ts'
import {useMemo} from 'react'
import {Worker} from '.'

type Props = {
    workers: [string, string, string][]
}

export const WorkersUnitList = ({workers}: Props) => {

    const [bossName, subs, users] = useMemo(() => {
        if (!workers || workers.length === 0) return [[], [], []]
        return workers.reduce((acc, [name, role, phone]) => {
                if (role === ERoles.BOSS && acc[0].length === 0) acc[0] = [name, phone]
                else if (role === ERoles.SUB) acc[1].push([name, phone])
                else if (role === ERoles.USER) acc[2].push([name, phone])
                return acc
            },
            [[], [], []] as [string[], string[][], string[][]]
        )
    }, [workers])

    return <div>
        <div className="pl-30 text-gray-600">
            <Worker text={ERoles.BOSS} boss={bossName} />
            <Worker text={ERoles.SUB} workers={subs} />
            <Worker text={ERoles.USER} workers={users} />
        </div>
    </div>
}