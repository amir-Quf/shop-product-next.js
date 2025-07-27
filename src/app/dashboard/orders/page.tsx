import { IProductData } from '@/app/store/page'
import Container from '@/components/Container'
import { IBasketData } from '@/zustand/userBasket/userBasket'
import { log } from 'console'
import React from 'react'
import ConfirmButton from '../components/confirmButton'

export interface IOrders {
    id : string
    basket: IBasketData[]
    user: string
    status: "being reviewed" | "sending" | "rejected" | "delivered"
}

export interface IProductInOrder extends IProductData {
    qty: number
    orderId : string
}

const OrdersList = async () => {
    const res = await fetch('http://localhost:4000/orders') 
    const data = (await res.json()) as IOrders[]
    const getProducts = await fetch('http://localhost:4000/products')
    const allProducts : IProductData[] = (await getProducts.json()) as IProductData[]

    const matchedProduct : IProductInOrder[] = data.flatMap(orderData => orderData.basket.map(productInBasket => {
        const product = allProducts.find(item => item.id === productInBasket.id)
        if (!product) return null 
        return {
            ...product,
            qty: productInBasket.qty,
            orderId : orderData.id
        }
    }).filter(Boolean) as IProductInOrder[]
)
    // const ConfirmHandler = (e) => {

    // }

    return (
    <section>
      <Container>
        <h2>Orders : </h2>
        {data.map((order) => (
            <div className='shadow bg-gray-200 p-3 rounded' key={order.id}>
            <h3>order ID : {order.id}</h3>
            <h3>Status : {order.status}</h3>
            <h3>User : {order.user}</h3>
            {matchedProduct.map((product) => {
                return(
                    <div key={product.id}>
                        <h3>product : {product.title}</h3>
                        <h3>count : {product.qty}</h3>
                    </div>
            )
            })}
            <ConfirmButton order={order}/>
            </div>
        ))}
      </Container>
    </section>
  )
}

export default OrdersList
