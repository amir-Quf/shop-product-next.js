import React from 'react'
import Container from '../../../components/container/page'
import { IProductData } from '../page'

interface IProductProps {
    params : Promise<{id : string}>;
    searchParams ?: Promise<{}>;
}

const ProductDetails = async (props : IProductProps) => {
    const {id} = await props.params
    const res = await fetch(`http://localhost:4000/products/${id}`)
    const data = (await res.json()) as IProductData
  return (
    <Container>
      <section className='grid grid-cols-12 shadow-2xl p-4'>
        <div className='col-span-3'>
            <img src={data.image} alt={data.title}/>
        </div>
        <div className='col-span-9 p-5 flex flex-col justify-between'>
          <div>
            <h2 className='font-bold text-2xl'>{data.title}</h2>
            <p className='text-gray-600 py-4'>{data.desc}</p>
            <p className='font-bold mb-3'>price : <span>$ {data.price}</span></p>
          </div>
            <div>
            <button className='bg-cyan-500 px-3 rounded font-bold text-2xl'> + </button>
            <span className='mx-2 font-bold text-lg'> 1 </span>
            <button className='bg-red-500 px-3 rounded font-bold text-2xl'> - </button>
            </div>
        </div>
      </section>
    </Container>
  )
}

export default ProductDetails
