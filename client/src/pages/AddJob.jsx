import {
  Form,
  redirect,
  // useActionData,
  useNavigation,
  useOutletContext,
} from 'react-router-dom'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import FormRow from '../components/FormRow'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import FormSelect from '../components/FormSelect'
import { customFetch } from '../utils/customFetch'
import { useRef } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const addJobAction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('jobs', data)
    toast.success('Job added')
    return redirect('all-jobs')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return { success: false }
  }
}

export default function AddJob() {
  const { user } = useOutletContext()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  // const formRef = useRef(null)
  // const actionData = useActionData()
  // this is if we decide to stay in the fpage to add another job
  // resets only on success
  // useEffect(() => {
  //   if (actionData?.success && formRef.current) {
  //     toast.success('Job created!!')
  //     formRef.current.reset()
  //   }
  // }, [actionData])

  return (
    <Wrapper>
      {/* <Form method='post' className='form' ref={formRef}> */}
      <Form method='post' className='form'>
        <h4 className='form-title'>add job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={user.location}
          />
          <FormSelect
            label='Job Status'
            name='jobStatus'
            valuesObject={JOB_STATUS}
          />
          <FormSelect label='Job Type' name='jobType' valuesObject={JOB_TYPE} />
          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}>
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}
