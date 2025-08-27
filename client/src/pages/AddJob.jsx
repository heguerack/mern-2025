import { Form, redirect, useOutletContext } from 'react-router-dom'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import FormRow from '../components/FormRow'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import FormSelect from '../components/FormSelect'
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'
import SubmitBtn from '../components/SubmitBtn '

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
            defaultValue={user?.location}
          />
          <FormSelect
            label='Job Status'
            name='jobStatus'
            valuesArray={Object.values(JOB_STATUS)}
          />
          <FormSelect
            label='Job Type'
            name='jobType'
            valuesArray={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
