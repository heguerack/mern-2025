import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import SmallSidebar from '../components/SmallSidebar'
import BigSidebar from '../components/BigSidebar'
import Navbar from '../components/Navbar'
import { createContext, useContext, useEffect, useState } from 'react'
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'

export const dashboardLoader = async () => {
  try {
    const currentUser = await customFetch.get('users/current-user')
    return currentUser
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    console.log(error)
    return error
  }
}

const DashboardContext = createContext()

export default function DashboardLayout() {
  const navigate = useNavigate()

  const response = useLoaderData()
  const currentUser = response.data

  //temp data
  const user = currentUser
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    document.body.classList.toggle('dark-theme', theme) //so this is how we toggle classes,  we locate the class, then what we want to toggle it with, like what value

    if (theme === 'true') setIsDarkTheme(true)
    if (theme === 'false') setIsDarkTheme(false)
  }, [])

  const toggleDarkTheme = () => {
    const newTheme = !isDarkTheme
    setIsDarkTheme(newTheme) //we do it this way, beuase if i od just setIsDarkTheme(!isDarkTheme) then we save the old value in local sotragem,  hope that makes sense mr Frank
    document.body.classList.toggle('dark-theme', newTheme) //an this is to toggle the css really
    localStorage.setItem('theme', newTheme)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
    console.log(showSidebar)
  }
  //cuz im not sending nor receiving data then regular call?
  const logoutUser = async () => {
    // so i cant grab the useNavigate from here???
    // const navigate = useNavigate()
    navigate('/login')
    await customFetch.get('/auth/logout')
    toast.success('User loggged out succesfully')
  }
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}>
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div className=''>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext) // we have to use the useContext anyways, so lets just build a hook!
