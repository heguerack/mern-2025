export default function SubmitBtn({ isSubmitting }) {
  return (
    <button
      className='btn btn-block form-btn'
      // type='button'
      disabled={isSubmitting}>
      {isSubmitting ? 'submitting..' : 'submit'}
    </button>
  )
}
