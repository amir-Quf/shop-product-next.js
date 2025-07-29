"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import ReactPaginate from 'react-paginate'

const Pagination = ({pageCount} : {pageCount : number}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const handlePageClick = (e : {selected : number}) => {
      const page = e.selected + 1
      const newURL = new URLSearchParams(searchParams.toString())
      newURL.set('page', page.toString())
      newURL.set('per_page', '4')
        router.push(`/store?${newURL}`)
        
    }
  return (
    <div>
      <ReactPaginate
        className='flex items-center justify-center gap-5 font-bold text-lg bg-gray-200 rounded w-fit px-20 py-2 mt-15 cursor-pointer sticky right-[37%] left-[37%] bottom-10 z-10'
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination
