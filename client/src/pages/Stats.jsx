import { ChartsContainer } from '../components/ChartsContainer'
import { StatsContainer } from '../components/StatsContainer'
import { useLoaderData } from 'react-router-dom'
import { customFetch } from '../utils/customFetch'

export const statsLoader = async () => {
  try {
    const response = await customFetch.get('jobs/stats')
    console.log('response:', response)

    console.log('response.data :', response.data)
    return response.data
  } catch (error) {
    return error
  }
}

export default function Stats() {
  const { defaultStats, monthlyApplications } = useLoaderData()
  // console.log('defaultStats:', defaultStats)
  // console.log('monthlyApplications:', monthlyApplications)
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  )
}
