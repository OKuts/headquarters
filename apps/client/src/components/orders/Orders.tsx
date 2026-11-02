import {AddSearchWrapper} from '../../elements/AddSearchWrapper.tsx'
import {useAdminStore} from '../../store'
import {useEffect} from 'react'

import {useOrdersStore} from '../../store/useOrdersStore.ts'
import {orderCreateApi} from '../../api'

type Props = {
    setAdd: (isAdd: string) => void
    watch: string
}

export const Orders = ({setAdd, watch}: Props) => {
    const {admin} = useAdminStore()
    const {orders, saveOrders} = useOrdersStore()

    useEffect(() => {
        if (watch.trim() === 'orders') {
            orderCreateApi({method: 'GET', data: null})
                .then(list => {
                    saveOrders(list.data)
                })
        }
    }, [saveOrders, watch])

    return <>
        {admin && <AddSearchWrapper setAdd={setAdd} watch={watch} text={'Додати розпорядження'}/>}
        <table className="table table-striped">
            <tbody>
            {orders.map((obj => <tr key={String(obj._id)}>
                <td>{obj.type}</td>
            </tr>))}
            </tbody>
        </table>
    </>
}