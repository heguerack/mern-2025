import { Form, Link, redirect } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import Logo from '../components/Logo'
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'
import FormRow from '../components/FormRow'
import SubmitBtn from '../components/SubmitBtn '

export const registerAction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/auth/register', data)
    toast.success('User created succesfully')
    return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    console.log(error)
    return error
  }
}

export default function Register() {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' />
        <FormRow type='text' name='lastName' labelText='last name' />
        <FormRow type='text' name='location' />
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}
