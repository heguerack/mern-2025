import { FaTimes } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo'
import { links } from '../utils/links'
import NavLinks from './NavLinks'
// import links from '../utils/links'

export default function SmallSidebar() {
  console.log(links)
  const { toggleSidebar, showSidebar } = useDashboardContext()
  // if (showSidebar) {
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }>
        <div className='content'>
          <button className='close-btn' type='button' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header className=''>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  )
  // } else {
  //   return ''
  // }
}
