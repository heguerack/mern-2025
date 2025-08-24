import Wrapper from '../assets/wrappers/StatItem'

export default function StatItem({ count, title, icon, color, bgcolor }) {
  return (
    <Wrapper color={color} bgcolor={bgcolor}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
        <h5 className='title'>{title}</h5>
      </header>
    </Wrapper>
  )
}
