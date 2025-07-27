import { IOrders } from '@/app/dashboard/orders/page'
import React from 'react'

const OrdersUser = async () => {
    const res = await fetch('http://localhost:4000/orders')
    const data = (await res.json()) as IOrders[]
    data.filter(order => {
        return order.user == ''
    })
  return (
    <div>
      
    </div>
  )
}

export default OrdersUser
