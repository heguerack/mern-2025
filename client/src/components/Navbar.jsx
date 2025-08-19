import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaHome } from 'react-icons/fa'
import { useDashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo'
import LogoutContainer from './LogoutContainer'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  // const data = useDashboardContext()
  const { toggleSidebar, user, isDarkTheme } = useDashboardContext()

  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn' type='button' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div className=''>
          <Logo />
          <h4 className='logo-tetx'>dashboard</h4>
        </div>
        <div className='btn-container'>
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  )
}
