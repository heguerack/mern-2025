import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import FormRow from '../components/FormRow'
import Logo from '../components/Logo'
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'
import SubmitBtn from '../components/SubmitBtn '

export const loginAction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('auth/login', data)
    toast.success('User logggedIn succesfully')
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    console.log(error)
    return error
  }
}

export default function Login() {
  const navigate = useNavigate()
  // IF TEST USER// this becuase we dont need to go though an action to grab the data, its here!
  const loginDemoUser = async () => {
    const data = {
      email: 'test@gmail.com',
      password: '12345',
    }
    try {
      await customFetch.post('auth/login', data)
      toast.success('Test Admin logggedIn succesfully')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      console.log(error)
    }
  }

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <SubmitBtn />
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
          Explore as Admin
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}
