import {ModalWrap} from '../total'
import {type JSX, useState} from 'react'
import {type DocumentEmpty, ELevel, type IDepartmentByWeight} from '@headquarters/shared'
import {InputDocBetween, InputFromTop, InputMiddleUp} from '../total/inputs'
import {useDepartmentsStore} from '../../store'
import {getUnitsByWeight} from '../../utils/departments'

type Props = {
    setAdd: (value: string) => void,
}

export const TelegramNavbar = ({setAdd}: Props) => {

    const {departments, departmentsNames} = useDepartmentsStore()

    const [docType, setDocType] = useState<{type: string, description: string}>({type: '', description: ''})
    const [unitsTop, setUnitsTop] = useState<DocumentEmpty | object>({})
    const [unitsDown, setUnitsDown] = useState<DocumentEmpty | object>({})

    const unitsByWeight: IDepartmentByWeight | null = getUnitsByWeight(departmentsNames, departments)

    if (!unitsByWeight) return null

    const inputMaps: Record<string, JSX.Element> = {
        [ELevel.FROM_TOP]: <InputFromTop setAdd={setAdd} unitsTop={unitsTop} setUnitsTop={setUnitsTop}
                                         unitsDown={unitsDown} setUnitsDown={setUnitsDown} unitsByWeight={unitsByWeight}
                                         description={docType.description} type={'FROM_TOP'}/>,
        [ELevel.FROM_DOWN]: <>ELevel.FROM_TOP</>,
        [ELevel.MIDDLE_UP]: <InputMiddleUp setAdd={setAdd} unitsTop={unitsTop} setUnitsTop={setUnitsTop}
                                          unitsDown={unitsDown} setUnitsDown={setUnitsDown} unitsByWeight={unitsByWeight}
                                          description={docType.description} type={'MIDDLE_UP'}/>,
        [ELevel.MIDDLE_DOWN]: <>ELevel.FROM_TOP</>,
    }



    return <>
        {!docType.type && <ModalWrap onClose={() => setAdd('')}>
            {!docType.type && <>
                <InputDocBetween
                    list={Object.values(ELevel)}
                    label={'Джерело документа'}
                    handler={setDocType}
                />
            </>


            }
        </ModalWrap>}

        {inputMaps[docType.type] || null}
    </>
}