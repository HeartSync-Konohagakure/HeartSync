import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './store/index.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom"
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import HomePage from './pages/HomePage.jsx'
import App from './App.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import EditProfilePage from './pages/EditProfilePage.jsx'
import Matches from './pages/Matches.jsx'
import Swal from 'sweetalert2'

const auth = () => {
  const access_token = localStorage.access_token;
  if (!access_token){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Login Dulu Bro',
    })
    throw redirect("/login");
  }
  return null;
}

const authLogin = () => {
  const access_token = localStorage.access_token;
  if (access_token){
    throw redirect("/");
  }
  return null;
}

const router = createBrowserRouter([

  {
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
        loader: authLogin,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/",
        element: <HomePage />,
        loader: auth
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        loader: auth
      },
      {
        path: "/edit-profile",
        element: <EditProfilePage />,
        loader: auth
      },
      {
        path: "/matches",
        element: <Matches />,
        loader: auth
      },
    ],
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
