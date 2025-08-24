import { useState } from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import Wrapper from '../assets/wrappers/LogoutContainer'
import { FaAlignLeft, FaUserCircle } from 'react-icons/fa'

export default function LogoutContainer() {
  const [showLogout, setShowLogout] = useState()
  const { user, logoutUser } = useDashboardContext()

  return (
    <Wrapper>
      <button
        type='button'
        className='btn logout-btn'
        onClick={() => setShowLogout(!showLogout)}>
        {/* <FaAlignLeft /> */}
        <FaUserCircle />
        {user?.name}
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button className='dropdown-btn' onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  )
}
