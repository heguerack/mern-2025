import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
// import Logo from '../components/Logo'

export default function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1 className=''>
            Job <span className=''>tracking</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            quidem? Dolorum, sint exercitationem consequatur illo tempora natus
            assumenda ducimus recusandae consectetur fugit eum odio fuga illum
            facere id aspernatur at quia iste aliquam eaque ad quae nobis itaque
            voluptatem? Dolorem?
          </p>
          <Link to={'/register'} className='btn register-link'>
            Register
          </Link>
          <Link to={'/login'} className='btn login-link'>
            Login
          </Link>
        </div>
        <img src={main} alt='' className='img main-img' />
      </div>
    </Wrapper>
  )
}
