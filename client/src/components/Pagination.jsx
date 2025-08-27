import { PaginationWrapper } from '../assets/wrappers/PaginationWrapper'

export function Pagination({ setPage, page, numOfPages }) {
  // console.log('page :', page)
  console.log('numOfPages :', numOfPages)
  const arrayLength = numOfPages <= 4 ? numOfPages : 3

  const pagesArray = () => {
    let pages = []

    let initialValue

    if (numOfPages < 4) {
      initialValue = 1
    } else {
      initialValue = page - 1
    }

    for (let i = initialValue + 1; i <= initialValue + 4; i++) {
      pages.push(i)
    }
    return pages
  }
  console.log(pagesArray())

  return (
    <PaginationWrapper>
      <div className=''>
        <button
          type='button'
          className='btn'
          onClick={() => {
            if (page <= initialValue) return
            setPage(page - 1)
          }}>
          {'<'} {'<'} Prev
        </button>
        {pagesArray().map((pageNumber, i) => (
          <span
            key={i}
            className={`page-number ${pageNumber === page && 'activePage'}`}>
            {pageNumber}
          </span>
        ))}
        <button
          type='button'
          className='btn'
          onClick={() => {
            if (page >= numOfPages) return
            setPage(page + 1)
          }}>
          Next {'>'} {'>'}
        </button>
      </div>
    </PaginationWrapper>
  )
}
