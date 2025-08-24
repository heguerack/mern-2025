import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../pages/AllJobs'
import Job from './Job'

export default function JobContainer() {
  const { jobs } = useAllJobsContext()

  if (!jobs) {
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div className='jobs'>
        {jobs.map((job) => (
          <Job key={job._id} {...job}>
            {job.company}
          </Job>
        ))}
      </div>
    </Wrapper>
  )
}
