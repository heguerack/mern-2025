import Wrapper from '../assets/wrappers/JobInfo'

export default function JobInfo({ text, icon }) {
  return (
    <Wrapper>
      <span className='job-icon'>{icon}</span>
      <span className='job-text'>{text}</span>
    </Wrapper>
  )
}
