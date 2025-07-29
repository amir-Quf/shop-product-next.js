'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { MdOutlineSearch } from "react-icons/md";
const SearchBox = () => {
    const [search, setSearch] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const searchHandler = () => {
        const newURL = new URLSearchParams(searchParams.toString())
        newURL.set('title',search)
        router.push(`/store?${newURL.toString()}`)
    }
  return (
    <div className='flex items-center justify-center my-6 rounded overflow-hidden'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} className='bg-gray-200 rounded-l p-2' type="search" placeholder='product...'/>
        <button onClick={searchHandler} className='bg-green-500 rounded-r p-2 text-white font-bold'><MdOutlineSearch className='text-2xl'/></button>
    </div>
  )
}

export default SearchBox
