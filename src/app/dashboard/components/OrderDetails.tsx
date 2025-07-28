import React from 'react'
import { IOrders, IProductInOrder } from '../orders/page';
import { IProductData } from '@/app/store/page';
import Link from 'next/link';
import OrderBtns from './OrderBtns';

const OrderDetails = ({order,data,allProducts} : {order : IOrders, data: IOrders[],allProducts : IProductData[]}) => {
    const matchedProduct: IProductInOrder[] = data.flatMap(
    (orderData) =>
      orderData.basket
        .map((productInBasket) => {
          const product = allProducts.find(
            (item) => item.id === productInBasket.id
          );
          if (!product) return null;
          return {
            ...product,
            qty: productInBasket.qty,
            orderId: orderData.id,
          };
        })
        .filter(Boolean) as IProductInOrder[]
  );
  return (
    <div
            className="font-bold shadow bg-gray-200 p-3 rounded"
            key={order.id}
          >
            <h3>order ID : {order.id}</h3>
            <h3>Status : <strong className={order.status === 'being reviewed' ? 'text-yellow-500' : order.status === 'delivered' ? 'text-green-500' : order.status === 'rejected' ? 'text-red-500' : order.status === 'sending' ? 'text-blue-500' : 'text-black'}>{order.status}</strong></h3>
            <h3>User address : {order.user}</h3>
            <h3 className="mt-2 pt-2 border-t-1">Products : </h3>
            {matchedProduct.map((product) => {
              return (
                <div
                  key={product.id}
                  className="mt-4 shadow flex items-center justify-between p-2"
                >
                  <div>
                    <h3>Product Title : {product.title}</h3>
                    <h3>count : {product.qty}</h3>
                  </div>
                  { order.status === "being reviewed" ? <Link href={`/store/${product.id}`}
                    className="bg-amber-600 p-2 rounded shadow shadow-amber-800 text-white">show details</Link> : ''}
                </div>
              );
            })}
            {order.status === "being reviewed" ? (
              <OrderBtns order={order} />
            ) : (
              ""
            )}
          </div>
  )
}

export default OrderDetails
