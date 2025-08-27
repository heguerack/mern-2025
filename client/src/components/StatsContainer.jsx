import Wrapper from '../assets/wrappers/StatsContainer'
import StatItem from '../components/StatItem'
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa'

export function StatsContainer({ defaultStats }) {
  const stats = [
    {
      title: 'Pending applications',
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bgcolor: '#fef3c7',
    },
    {
      title: 'Interview Schedulled',
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bgcolor: '#e0e8f9',
    },
    {
      title: 'Jobs declined',
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: '#b66a6a',
      bgcolor: '#ff1234',
    },
  ]
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />
      })}
    </Wrapper>
  )
}
