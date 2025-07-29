import Container from '@/components/Container'
import Product from '@/components/cardProduct'
import Pagination from '@/components/pagination';
import { log } from 'console';
import Link from 'next/link';
import React from 'react'
import SearchBox from './[id]/components/searchBox';

export interface IProductData {
    id: string;
    image: string;
    title: string;
    desc: string;
    price : number;
    discount : number
}

export interface IProps {
    params : Promise<{}>
    searchParams : Promise<{
        page: string, per_page: string,title: string
    }>
}

export interface IProductList {
    first: number | null
    items: number | null
    last: number | null
    next: number | null
    pages: number
    prev: number | null
    data: IProductData[]
}

const Store = async ({searchParams} : IProps) => {
    const page = (await searchParams).page ?? "1"
    const per_page = (await searchParams).per_page ?? "4"
    const title = (await searchParams).title ?? ""
    const res = await fetch(`http://localhost:4000/products?_page=${page}&_per_page=${per_page}&title=${title}`)
    const data : IProductList = await res.json()
  return (
    <Container>
        <SearchBox/>
        <section className='grid grid-cols-4 gap-5 my-5'>
            {data.data.map((product : IProductData) => {
                return (
                    <Link href={`/store/${product.id}`} key={product.id}>
                    <Product {...product}/>
                    </Link>
                )
            })}
        </section>
            <Pagination pageCount={data.pages}/>
    </Container>
  )
}

export default Store
