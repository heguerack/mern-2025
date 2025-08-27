import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../pages/AllJobs'
import Job from './Job'
import { PaginationModernApproach } from './PaginationModernApproach'

export default function JobContainer() {
  const { data } = useAllJobsContext()
  const { totalJobs, numOfPages, jobs } = data
  // console.log('jobobContainerData:', data)

  if (!jobs.length) {
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      {numOfPages > 1 && <PaginationModernApproach />}
      <div className='jobs'>
        {jobs?.map((job) => (
          <Job key={job._id} {...job}>
            {job.company}
          </Job>
        ))}
      </div>
    </Wrapper>
  )
}
