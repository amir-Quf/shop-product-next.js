import { IProductData } from '@/app/store/page'
import React from 'react'

const Product = ({title, image, desc, price, discount} : IProductData) => {
  return (
    <div>
      <div className='rounded-xl overflow-hidden shadow-md'>
            <img src={image} alt={title} className=''/>
            <div className='p-4'>
            <h3 className='font-bold mb-1'>{title}</h3>
            <p className='font-bold mb-1'>price : <span className={discount ? `line-through opacity-70` : ''}>$ {(price).toLocaleString()}</span>
                    {discount ? <span className="ml-1 text-xl"> ${(Number((price - ((price * discount) / 100)).toFixed(1))).toLocaleString()}</span> : ''}
                    {discount ? <p className="mt-1">discount : %{discount}</p> : ''}</p>
            <p className='text-gray-600'>{desc}</p>
            </div>
        </div>
    </div>
  )
}

export default Product
