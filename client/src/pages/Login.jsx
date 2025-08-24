import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Form, Link, redirect, useNavigation } from 'react-router-dom'

import FormRow from '../components/FormRow'
import Logo from '../components/Logo'
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'

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
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' defaultValue='heguer76@gmail.com' />
        <FormRow type='password' name='password' defaultValue='12345' />
        <button type='submit' className='btn btn-block'>
          {isSubmitting ? 'submitting' : 'Submit'}
        </button>
        <button type='button' className='btn btn-block'>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn' disabled={isSubmitting}>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}
