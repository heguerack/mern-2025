import { NavLink } from 'react-router-dom'
import { links } from '../utils/links'
import { useDashboardContext } from '../pages/DashboardLayout'

export default function NavLinks({ toggleSidebar }) {
  const { user } = useDashboardContext()

  const urserLinks = links.filter((link) => link.text !== 'admin')

  const navLinks = user?.role === 'admin' ? links : urserLinks

  return (
    <div className='nav-links'>
      {navLinks.map((link) => {
        const { text, icon, path } = link

        return (
          <NavLink
            to={path}
            key={path}
            className={'nav-link'}
            onClick={toggleSidebar}
            end>
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}
