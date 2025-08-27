import { toast } from 'react-toastify'
import { customFetch } from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { createContext, useContext } from 'react'
import SearchContainer from '../components/SearchContainer'
import JobContainer from '../components/JobContainer'

export const allJobsLoader = async ({ request }) => {
  const newUrl = new URL(request.url)
  // I need to dig a bit more into this, i know whats going on, just  a review
  const params = Object.fromEntries([...newUrl.searchParams.entries()])

  try {
    const res = await customFetch.get('jobs', { params }) //an axios thing, we dont need to readjust params
    const { data } = res

    return { data, searchValues: { ...params } }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    console.log(error)
    return error
  }
}

const AllJobsContext = createContext()

export default function AllJobs() {
  const { data, searchValues } = useLoaderData()
  // console.log('data>allJobs:', data)

  // const { jobs, totalJobs, numOfPages, currentPage } = data

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)
