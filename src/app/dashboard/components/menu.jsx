"use client"

const Menu = () => {
  return (
    <div className='flex items-center justify-center flex-col h-[100vh] divide-y-2 divide-cyan-50 max-w-2xl m-auto overflow-hidden'>
      <a className='bg-sky-500 w-full py-4 rounded text-lg text-white text-shadow-2xl text-shadow-sky-700 shadow-2xl cursor-pointer text-center'>Add product</a>
      <a className='bg-sky-500 w-full py-4 rounded text-lg text-white text-shadow-2xl text-shadow-sky-700 shadow-2xl cursor-pointer text-center'>Edit product</a>
      <a className='bg-sky-500 w-full py-4 rounded text-lg text-white text-shadow-2xl text-shadow-sky-700 shadow-2xl cursor-pointer text-center'>Orders</a>
      <a className='bg-sky-500 w-full py-4 rounded text-lg text-white text-shadow-2xl text-shadow-sky-700 shadow-2xl cursor-pointer text-center'>Support</a>
    </div>
  )
}

export default Menu
