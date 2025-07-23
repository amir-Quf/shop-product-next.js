import { IProductData } from '@/app/store/page'
import React from 'react'

const Product = ({title, image, desc, price} : IProductData) => {
  return (
    <div>
      <div className='rounded-xl overflow-hidden shadow-md'>
            <img src={image} alt={title} className=''/>
            <div className='p-4'>
            <h3 className='font-bold mb-1'>{title}</h3>
            <p className='font-bold mb-1'>price : <span>${price}</span></p>
            <p className='text-gray-600'>{desc}</p>
            </div>
        </div>
    </div>
  )
}

export default Product
