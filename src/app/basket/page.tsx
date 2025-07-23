import React from 'react'

const Basket = () => {
    const res = fetch('http://localhost:4000/basket')
  return (
    <section>
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
    </section>
  )
}

export default Basket
