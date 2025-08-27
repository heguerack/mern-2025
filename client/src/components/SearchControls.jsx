import { Link } from 'react-router-dom'

export default function SearchControls({
  limit,
  setLimit,
  setBounceTime,
  bounceTime,
}) {
  return (
    <>
      <div className=''>
        <button
          type='button'
          className='btn'
          onClick={() => {
            if (page === 1) return
            setPage(page - 1)
          }}>
          {'<<'} Dec # pages {limit}
        </button>{' '}
        <button
          type='button'
          className='btn'
          onClick={() => {
            if (page >= numOfPages) return
            setPage(page + 1)
          }}>
          Inc # pages {limit} {'>>'}
        </button>
      </div>
      <div className=''>
        {' '}
        <div className='bounce-input-warpper'>
          <div className=''>
            {' '}
            <input
              type='number'
              className='bounce-input'
              placeholder='enter time in miliseconds'
              value={bounceTime}
              onChange={(e) => setBounceTime(e.target.value)}
            />{' '}
            <button
              className='bounce-button'
              type='button'
              onClick={() => setBounceTime(bounceTime)}>
              Enter bounce time in millisecods
            </button>
          </div>

          <div className='reset-values-wrapper'>
            <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
              Reset Search Values
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
