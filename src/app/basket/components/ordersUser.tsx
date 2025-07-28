<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c932dd375003eae1c0be7ab1420fb2b4cef6aa94
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
<<<<<<< HEAD
=======
'use client'
import { IOrders, IProductInOrder } from '@/app/dashboard/orders/page'
import { IProductData } from '@/app/store/page'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const OrdersUser = ({allProducts} : {allProducts : IProductData[]}) => {
  const [data, setData] = useState<IOrders[]>([])
  useEffect(() => {
    const fetchingOrders = async () => {
      const {data} = await axios.get('http://localhost:4000/orders')
      setData(data)
    }
    fetchingOrders()
  }, [])
    const userOrders : IOrders[] = data.filter(order => {
        return order.user === ''
    })
    const orders : IProductInOrder[] = userOrders.flatMap(order => order.basket.map(userOrder => {
      const product = allProducts.find(product => userOrder.id === product.id)
      if (!product) return null;
      return {
            ...product,
            qty: userOrder.qty,
            orderId: userOrder.id,
          };
    }).filter(Boolean) as IProductInOrder[]
  )
  return (
    <>
    {userOrders ? <h2 className='mt-5 font-bold'>Orders List : </h2> : 'you have not registered orders.'}
    {userOrders.map((order) => (
      <section key={order.id} className='bg-gray-400 rounded p-4 mt-4'>
        <h3 className='text-xl'>order status: {order.status}</h3>
        <h3>address : </h3>
        <div className='grid grid-cols-12 gap-2'>
      {orders.map(order => (
        <Link href={`/store/${order.id}`} key={order.id} className='col-span-2 rounded overflow-hidden bg-white p-2' >
          <div>
        <img src={order.image} alt={order.title}/>
        <h3 className='font-bold pt-2'>product title : {order.title}</h3>
        <h3 className='font-bold pt-2'>count : {order.qty}</h3>
      </div>
        </Link>
      ))}
      </div>
    </section>
    ))}
    </>
>>>>>>> ae9b2a6 (initial commit)
=======
>>>>>>> c932dd375003eae1c0be7ab1420fb2b4cef6aa94
  )
}

export default OrdersUser
