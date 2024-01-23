import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './store/index.js'
import { Provider } from 'react-redux'
import { RouterProvider } from "react-router-dom"
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import HomePage from './pages/HomePage.jsx'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
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
