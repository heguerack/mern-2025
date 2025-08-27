import { useLocation, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useAllJobsContext } from '../pages/AllJobs'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'

export function PaginationModernApproach() {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext()
  console.log({ numOfPages, currentPage })

  const AllPagesArray = Array.from({ length: numOfPages }, (_, i) => i + 1)
  // upto here = we just have an array from to the numOfpages
  console.log('pagesArray', AllPagesArray)

  const navigate = useNavigate()
  const { search, pathname } = useLocation()

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  //BUTONS
  //BUTONS
  //BUTONS
  //BUTONS
  const addPageButtonFuntion = ({ pageNumber, activeClass }) => (
    <button
      onClick={() => {
        let nextPage = currentPage + 1
        if (nextPage > numOfPages) nextPage = 1
        handlePageChange(nextPage)
      }}
      key={pageNumber}
      className={
        // pageNumber === currentPage ? 'active btn page-btn' : 'btn page-btn'
        activeClass ? 'active btn page-btn' : 'btn page-btn'
      }>
      {pageNumber}
    </button>
  )

  const renderPageButtons = () => {
    const pageButtons = []
    //FIRST BUTTON
    pageButtons.push(
      addPageButtonFuntion({ pageNumber: 1, activeClass: currentPage === 1 })
    )

    //dots...
    if (currentPage > 3) {
      pageButtons.push(
        <span className='page-btn ' key={'dots-1'}>
          ...
        </span>
      )
    }

    // before Current
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButtonFuntion({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      )
    }

    // CURRENT BUTTON
    // so that if fisrt or last button its display, it does repeat
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButtonFuntion({
          pageNumber: currentPage,
          activeClass: true,
        })
      )
    }

    // After Current
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButtonFuntion({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      )
    }

    //dots...
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className=' page-btn ' key={'dots-2'}>
          ...
        </span>
      )
    }

    // LAST BUTTON
    pageButtons.push(
      addPageButtonFuntion({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    )

    return pageButtons
  }

  return (
    <Wrapper>
      <button
        className='btn next-btn'
        onClick={() => {
          let prevPage = currentPage - 1
          if (prevPage < 1) prevPage = numOfPages
          handlePageChange(prevPage)
        }}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='button-container'>
        {/* {AllPagesArray.map((pageNumber) => (
        <AddPageButton pageNumber={pageNumber} />
      ))} */}
        {renderPageButtons()}
      </div>
      <button
        className='btn prev-btn'
        onClick={() => {
          let nextPage = currentPage + 1
          if (nextPage > numOfPages) nextPage = 1
          handlePageChange(nextPage)
        }}>
        next
        <HiChevronDoubleRight />
      </button>
      <div className=''></div>
    </Wrapper>
  )
}
