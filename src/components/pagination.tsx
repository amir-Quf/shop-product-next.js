"use client"
import { useRouter } from 'next/navigation'
import ReactPaginate from 'react-paginate'

const Pagination = ({pageCount} : {pageCount : number}) => {
    const router = useRouter()
    const handlePageClick = (e : {selected : number}) => {
        const page = e.selected + 1
        router.push(`/store?page=${page}&per_page=4`)
        
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
