import { Form, Link, redirect, useNavigation } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import Logo from '../components/Logo'
// import FormRow from '../components/FormRow'
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'
import FormRow from '../components/FormRow'

export const registerAction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/auth/register', data)
    // return null // remeber this is becasue its an action
    toast.success('User created succesfully')
    return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    console.log(error)
    return error // remeber this is becasue its an action, in this case insteade of null we can return an eror, as long as w return soemthing
  }
}

export default function Register() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

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

        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting' : 'Submit'}
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn' disabled={isSubmitting}>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}
