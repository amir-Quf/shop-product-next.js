'use client'

import axios from "axios"
import { IOrders } from "../orders/page"
import Swal from "sweetalert2"

const ConfirmButton = ({order}: {order: IOrders}) => {
    const confirmHandler = () => {
        axios.put(`http://localhost:4000/orders/${order.id}`,{
            ...order,
            status: 'sending'
        })
        .then(() => {
            Swal.fire({
                title: 'order successfully Confirmed',
                icon: 'success'
            })
        })
        .catch((err) =>{
            Swal.fire({
                title: `order Confirmation encountered an error : ${err}`,
                icon: 'error'
            })
        })
    }
    const rejectHandler = () => {
        axios.put(`http://localhost:4000/orders/${order.id}`,{
            ...order,
            status: 'rejected'
        })
        .then(() => {
            Swal.fire({
                title: 'order successfully rejected',
                icon: 'warning'
            })
        })
        .catch((err) =>{
            Swal.fire({
                title: `order Confirmation encountered an error : ${err}`,
                icon: 'error'
            })
        })
    }
  return (
    <div className="flex items-center justify-between pt-10">
        <button onClick={confirmHandler} className='bg-emerald-600 rounded p-2 text-white shadow shadow-emerald-800'>Confirm order</button>
        <button onClick={rejectHandler} className='bg-red-600 rounded p-2 text-white shadow shadow-red-800'>reject order</button>
    </div>
  )
}

export default ConfirmButton
