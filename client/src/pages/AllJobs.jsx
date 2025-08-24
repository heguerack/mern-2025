import { toast } from 'react-toastify'
import { customFetch } from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { createContext, useContext } from 'react'
import SearchContainer from '../components/SearchContainer'
import JobContainer from '../components/JobContainer'

export const allJobsLoader = async () => {
  try {
    const res = await customFetch.get('jobs')
    // console.log('jobs loader:', res.data)
    return res.data
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    console.log(error)
    return error
  }
}

// so that we dont pass props down too much
const AllJobsContext = createContext()

export default function AllJobs() {
  const { jobs } = useLoaderData()
  // console.log('jobs mf:', jobs)

  return (
    <AllJobsContext.Provider value={{ jobs }}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)
