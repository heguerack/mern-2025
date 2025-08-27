import { useNavigation } from 'react-router-dom'

export default function SubmitBtn({ formBtn }) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <button
      className={`btn btn-block ${formBtn && 'form-btn'} `}
      disabled={isSubmitting}>
      {isSubmitting ? 'submitting..' : 'submit'}
    </button>
  )
}
