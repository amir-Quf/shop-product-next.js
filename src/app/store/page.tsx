import Container from '@/components/container/page'
import Product from '@/components/cardProduct'
import Link from 'next/link';
import React from 'react'

export interface IProductData {
    id?: string;
    image: string;
    title: string;
    desc: string;
    price : number;
}

const Store = async () => {
    const res = await fetch('http://localhost:4000/products')
    const data : IProductData[] = await res.json()
  return (

    <Container>
        <section className='grid grid-cols-4 gap-5 mt-5'>
            {data.map((product : IProductData) => {
                return (
                    <Link href={`/store/${product.id}`} key={product.id}>
                    <Product {...product}/>
                    </Link>
                )
            })}
        </section>
    </Container>
  )
}

export default Store
