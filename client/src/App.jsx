import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  HomeLayout,
  Landing,
  Login,
  DashboardLayout,
  Error,
  Register,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from './pages'
import { registerAction } from './pages/Register'
import { loginAction } from './pages/Login'
import { dashboardLoader } from './pages/DashboardLayout'
import { addJobAction } from './pages/AddJob'
import { editJobAction, editJobLoader } from './pages/EditJob'
import { deleteJobAction } from './pages/DeleteJob'
import { adminLoader } from './pages/Admin'
import { profileAction } from './pages/Profile'
import { statsLoader } from './pages/Stats'
import { allJobsLoader } from './pages/AllJobs'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          { path: 'delete-job/:id', action: deleteJobAction },
        ],
      },
    ],
    errorElement: <Error />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
