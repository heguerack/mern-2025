import { NavLink } from 'react-router-dom'
import { links } from '../utils/links'

export default function NavLinks({ toggleSidebar }) {
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, icon, path } = link
        return (
          <NavLink
            to={path}
            key={path}
            className={'nav-link'}
            onClick={toggleSidebar} // no need to pass the isBigSidabe bar, becuase if null then it does nothing, i could be wrong and ther emight be a bug with this logic, but so far so good.
            // end  will make it so that add job doesnt show as active as addjob is the parent and will alswys show, this way we get rid of that
            end>
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}
