import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import imageForm from '../assets/images.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { register } from "../store/appSlice"  // panggil function nya

const RegisterPage = () => {
 // panggil state nya, appReducer dari index.js
 let { isError, errorMessage } = useSelector((state) => state.appReducer)
 let navigate = useNavigate()
 let dispatch = useDispatch()
 let currentTheme = localStorage.getItem('theme')
 let [input, setInput] = useState({
   username: '',
   email: '',
   password: '',
   gender: '',
   interest: ''
 })

 let changeInput = (e) => {
   let { name, value } = e.target
   setInput({
     ...input,
     [name]: value
   })
 }

 async function saveSubmit(e) {
   e.preventDefault()
   await dispatch(register(input))
   navigate('/login')
 }

 useEffect(() => {
   if (currentTheme) {
     document.documentElement.setAttribute('data-theme', currentTheme)
   }
 }, [currentTheme])
    return (
      <>
    <div className="flex h-screen">
      {/* Left Side - Form Fields */}
      <div className="flex flex-col w-1/4 justify-center items-center bg-base-200 shadow-2xl rounded-2xl p-8 space-y-5">
        <span className="mb-3 text-4xl font-bold">Register</span>
        <span className="font-light text-bg-body-secondary">
          Welcome to Datinger! Have fun on your new journey
        </span>

        {isError && (
          <div role="alert" className="alert mb-2 alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Fields */}
        <div className="py-1">
          <span htmlFor='username' className="mb-2 text-md">Username</span>
          <input
            type="text"
            className="w-full p-2 rounded-md"
            name="username"
            id="username"
            onChange={changeInput}
          />
        </div>
        <div className="py-1">
          <span htmlFor='email' className="mb-2 text-md">Email</span>
          <input
            type="text"
            className="w-full p-2 rounded-md"
            name="email"
            id="email"
            onChange={changeInput}
          />
        </div>
        <div className="py-1">
          <span htmlFor='password' className="mb-2 text-md">Password</span>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-2 rounded-md"
            onChange={changeInput}
          />
        </div>
        <div className="py-1">
          <span htmlFor='gender' className="mb-2 text-md">Gender</span>
          <select
            className="select w-full p-2 rounded-md"
            name="gender"
            id="gender"
            defaultValue="Select Gender"
            onChange={changeInput}
          >
            <option disabled>Select Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>
        <div className="py-1">
          <span htmlFor='interest' className="mb-2 text-md">Interest</span>
          <select
            className="select w-full p-2 rounded-md"
            name="interest"
            id="interest"
            defaultValue="Select Interest"
            onChange={changeInput}
          >
            <option className='m-10' disabled>Select Interest</option>
            <option className='m-10' value='male'>Male</option>
            <option className='m-10' value='female'>Female</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-base-300 mt-4 text-bg-body-secondary p-2 rounded-lg mb-6 hover:bg-base-200"
          onClick={saveSubmit}
        >
          Sign Up
        </button>

        <div className="text-center text-bg-body-secondary ">
          Already have an account?
          <a href='/login' className="font-bold mx-2 text-bg-body-secondary hover:text-base-300">Login</a>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-3/4 relative bg-base-300 rounded-md">
        <img
          src={imageForm}
          alt="img"
          className="absolute h-full w-full object-cover rounded-r-2xl"
        />
      </div>
    </div>
  </>
    )
  }
  
  export default RegisterPage