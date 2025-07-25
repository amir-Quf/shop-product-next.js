"use client"
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { IProductData } from "../store/page";
import useUserBasket from "@/zustand/userBasket/userBasket";
import axios from "axios";


const Basket =  () => {
  const {basket} = useUserBasket()
  const [allProducts, setAllProducts] = useState([])
  useEffect(() => {
    axios.get('http://localhost:4000/products')
    .then(res => setAllProducts(res.data))
  }, [basket])
  return(
    <Container>
      <section className='grid grid-cols-12 shadow-2xl p-4'>
        {basket.map(product => {
          return(
            <>
        <div className='col-span-3'>
            <img src={product.image} alt={product.title}/>
        </div>
        <div className='col-span-9 p-5 flex flex-col justify-between'>
          <div>
            <h2 className='font-bold text-2xl'>{product.title}</h2>
            <p className='text-gray-600 py-4'>{product.desc}</p>
            <p className='font-bold mb-3'>price : <span>$ {product.price}</span></p>
          </div>
            <div>
            <button className='bg-cyan-500 px-3 rounded font-bold text-2xl'> + </button>
            <span className='mx-2 font-bold text-lg'> 1 </span>
            <button className='bg-red-500 px-3 rounded font-bold text-2xl'> - </button>
            </div>
        </div>
            </>
          )
        })}
      </section>
    </Container>
  );
};

export default Basket;
