import React from 'react'
import Container from '../../../components/Container'
import { IProductData } from '../page'
import CountOperators from './components/countOperators';

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
            <p className='font-bold mb-3'>price : <span className={data.discount ? `line-through opacity-70` : ''}>$ {(data.price).toLocaleString()}</span>
                    {data.discount ? <span className="ml-1 text-xl"> ${(Number((data.price - ((data.price * data.discount) / 100)).toFixed(1))).toLocaleString()}</span> : ''}
                    {data.discount ? <p className="mt-3">discount : %{data.discount}</p> : ''}</p>
          </div>
            <CountOperators IdProduct={id}/>
        </div>
      </section>
    </Container>
  )
}

export default ProductDetails
