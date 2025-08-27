import { Form, Link, useSubmit } from 'react-router-dom'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import FormRow from './FormRow'
import FormSelect from './FormSelect'
import SubmitBtn from './SubmitBtn '
// import { JOB_STATUS, JOB_TYPE, JOBSORT_BY } from '../../../utils/constants'

import { useAllJobsContext } from '../pages/AllJobs'
import { useState } from 'react'
const JOB_STATUS = {
  PENDING: 'pending',
  INTERVIEW: 'interview',
  DECLINED: 'declined',
}

const JOB_TYPE = {
  FULTIME: 'full-time',
  PARTTIME: 'part-time',
  INTERSHIP: 'intership',
}

const JOBSORT_BY = {
  NEWEST_FIRST: 'newest',
  OLDEST_FIRST: 'oldest',
  ASCENDING: 'a-z',
  DESCENDING: 'z-a',
}
export default function SearchContainer() {
  const [bounceTime, setBounceTime] = useState(300)
  const { searchValues } = useAllJobsContext()
  const { search, jobStatus, jobType, sort } = searchValues
  const submit = useSubmit()
  const debaunce = (myFn) => {
    let timeout
    return (e) => {
      const form = e.currentTarget.form
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        myFn(form)
      }, bounceTime)
    }
  }

  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          <FormRow
            type='search'
            name='search'
            defaultValue={search}
            onChange={debaunce((myFnParameter) => {
              submit(myFnParameter)
              console.log('hello!!!!!!!!!!!!')
            })}
          />
          <FormSelect
            label='job status'
            name='jobStatus'
            valuesArray={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormSelect
            label='job type'
            name='jobType'
            valuesArray={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormSelect
            label='Sort'
            name='sort'
            defaultValue={sort}
            valuesArray={Object.values(JOBSORT_BY)}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <div className='reset-values-wrapper'>
            <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
              Reset Search Values
            </Link>
          </div>
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
