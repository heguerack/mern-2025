import { toast } from 'react-toastify'
import { customFetch } from '../utils/customFetch'
import {
  redirect,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from 'react-router-dom'
import Wrapper from '../assets/wrappers/StatsContainer'
import StatItem from '../components/StatItem'
import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa'

export const adminLoader = async () => {
  try {
    const res = await customFetch.get('/users/admin/app-stats')
    console.log('data :', res.data)

    toast.success('users and jobs on board!')

    return res.data
  } catch (error) {
    // toast.error('You are NOT authorrize to see this page')
    // console.log(error)
    // return redirect('/dashboard')
    return error
  }
}

export default function Admin() {
  const navigate = useNavigate()
  const { user } = useOutletContext()
  const { jobs, users, totalUsers, totalJobs } = useLoaderData()

  console.log(jobs.length)

  if (user.role === 'user') {
    navigate('/dashboard')
  }
  return (
    <Wrapper>
      <StatItem
        title='current users'
        count={users.length}
        color='#e9b949'
        bgcolor='#fcefc7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total jobs'
        count={jobs.length}
        color='#647acb'
        bgcolor='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  )
}
