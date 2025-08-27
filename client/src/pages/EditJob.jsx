import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useLoaderData } from 'react-router-dom'
import { Form, redirect } from 'react-router-dom'
import FormRow from '../components/FormRow'
import FormSelect from '../components/FormSelect'
import SubmitBtn from '../components/SubmitBtn '
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'

export const editJobLoader = async ({ params }) => {
  const { id } = params
  console.log(`/jobs/${id}`)

  try {
    const res = await customFetch.get(`jobs/${id}`)
    return res.data
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    console.log(error)
    return error
  }
}

export const editJobAction = async ({ request, params }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)

  try {
    await customFetch.patch(`/jobs/${params.id}`, data)
    toast.success('Job edited')
    return redirect('/dashboard/all-jobs')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

export default function EditJob() {
  const { job } = useLoaderData()
  console.log('useLoaderData :', job)

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' defaultValue={job.position} />
          <FormRow type='text' name='company' defaultValue={job.company} />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            defaultValue={job.jobLocation}
          />
          <FormSelect
            name='jobStatus'
            labelText='job status'
            // defaultValue={job.jobStatus}
            valuesObject={JOB_STATUS}
          />
          <FormSelect
            name='jobType'
            label='job type'
            // defaultValue={job.jobType}
            valuesObject={JOB_TYPE}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
