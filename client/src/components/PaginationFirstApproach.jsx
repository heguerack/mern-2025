import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useAllJobsContext } from '../pages/AllJobs'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'

export function PaginationFirstApproach() {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext()
  console.log({ numOfPages, currentPage })

  const AllPagesArray = Array.from({ length: numOfPages }, (_, i) => i + 1)
  // upto here = we just have an array from to the numOfpages
  console.log('pagesArray', AllPagesArray)

  return (
    <Wrapper>
      <button className='btn next-btn'>
        <HiChevronDoubleLeft />
        prev
      </button>
      {AllPagesArray.map((pageNumber) => (
        <button
          key={pageNumber}
          className={
            pageNumber === currentPage ? 'active btn page-btn' : 'btn page-btn'
          }>
          {pageNumber}
        </button>
      ))}
      <button className='btn prev-btn'>
        next
        <HiChevronDoubleRight />
      </button>
      <div className=''></div>
    </Wrapper>
  )
}
