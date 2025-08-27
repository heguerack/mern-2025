import { Form, useOutletContext } from 'react-router-dom'
import FormRow from '../components/FormRow'
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'
import SubmitBtn from '../components/SubmitBtn '

export const profileAction = async ({ request }) => {
  const user = request.user
  const formData = await request.formData()
  const file = formData.get('avatar')
  console.log(file)
  //should look like this
  // lastModified: 1756039012015
  // lastModifiedDate:Sun Aug 24 2025 06:36:52 GMT-0600 (Mountain Daylight Time) {}
  // name: "Screenshot 2025-08-23 181709.png"
  // size: 2688344
  // type:"image/png"
  // webkitRelativePath:""
  //this is becuase remeber th file is optiona, but if there then no more than that size
  if (file && file.size > 500000) {
    // if (file) {
    toast.error('file cant be larger than .5 megabites or 500 kilobytes')
    return null
  }
  try {
    //right , and we dont need to send the id as its in the cookie!!
    await customFetch.patch(`/users/update-user`, formData)
  } catch (error) {
    toast.error('file cant be larger than .5 megabites or 500 kilobytes')
  }
  //regarles if we are sucessful or not
  return null
}

export default function Profile() {
  const { user } = useOutletContext()
  const { lastName, name, email, location } = user

  return (
    <div>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>
        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='image' className='form-label'>
              Select an image file (max 0.5 MB):
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>
          <FormRow type='text' name='name' defaultValue={name} />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            defaultValue={lastName}
          />
          <FormRow type='email' name='email' defaultValue={email} />
          <FormRow type='text' name='location' defaultValue={location} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </div>
  )
}
