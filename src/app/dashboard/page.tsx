import React from 'react'
import Container from '@/components/Container'
import Link from 'next/link'
const Dashboard = () => {
  return (
    <Container>
      <div className='flex items-center justify-center flex-col h-[100vh] divide-y-2 divide-cyan-50 max-w-2xl m-auto overflow-hidden'>
        <Link href='/dashboard/add-product' className='bg-sky-500 w-full py-4 rounded text-lg text-white text-shadow-2xl text-shadow-sky-700 shadow-2xl cursor-pointer text-center'>Add product</Link>
        <Link href='/dashboard' className='bg-sky-500 w-full py-4 rounded text-lg text-white text-shadow-2xl text-shadow-sky-700 shadow-2xl cursor-pointer text-center'>Edit product</Link>
        <Link href='/dashboard/orders' className='bg-sky-500 w-full py-4 rounded text-lg text-white text-shadow-2xl text-shadow-sky-700 shadow-2xl cursor-pointer text-center'>Orders</Link>
        <Link href='/dashboard' className='bg-sky-500 w-full py-4 rounded text-lg text-white text-shadow-2xl text-shadow-sky-700 shadow-2xl cursor-pointer text-center'>Support</Link>
      </div>
    </Container>
  )
}

export default Dashboard
