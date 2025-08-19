import { Outlet } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import SmallSidebar from '../components/SmallSidebar'
import BigSidebar from '../components/BigSidebar'
import Navbar from '../components/Navbar'
import { createContext, useContext, useEffect, useState } from 'react'

const DashboardContext = createContext()

export default function DashboardLayout() {
  //temp data
  const user = { name: 'Frank' }
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

  const logoutUser = async () => {
    console.log('logout user')
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
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext) // we have to use the useContext anyways, so lets just build a hook!
