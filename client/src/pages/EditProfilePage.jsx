import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveSubmitUpdated } from '../store/appSlice'

const EditProfilePage = () => {

    let navigate = useNavigate()
    let dispatch = useDispatch()

    let [input, setInput] = useState({
        username: '',
        email: '',
        gender: '',
        interest: '',
        show: '',
        fullname: '',
        birthdate: '',
        profilePicture: '',
        address: '',
        occupation: '',
        bio: ''
    })

    function formatterDate(value) {
        let date = new Date(value);
        let year = date.getFullYear();
        let month = `${date.getMonth() + 1}`.padStart(2, '0');
        let day = `${date.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    async function fetching() {
        try {
            let link = "https://heart-sync.baiquni.my.id/users/profile"
            let { data } = await axios({
                method: 'get',
                url: link,
                headers: {
                    Authorization: 'Bearer ' + localStorage.access_token
                }
            })
            setInput({
                username: data.username,
                email: data.email,
                gender: data.gender,
                interest: data.interest,
                show: data.show,
                fullname: data.UserProfile.fullname,
                birthdate: formatterDate(data.UserProfile.birthdate),
                profilePicture: data.UserProfile.profilePicture,
                address: data.UserProfile.address,
                occupation: data.UserProfile.occupation,
                bio: data.UserProfile.bio
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            })
        }
    }

    let changeInput = (e) => {
        let { name, value } = e.target
        setInput({
            ...input,
            [name]: value
        })
    }

    async function saveSubmit(e) {
        e.preventDefault()
        await dispatch(saveSubmitUpdated(input))
        navigate('/profile')
    }

    useEffect(() => {
        fetching()
    }, [])

    return (
        <>
            <div className="isolate px-6 py-15 sm:py-20 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-xl">Update Your Profile </h2>
                </div>
                <form onSubmit={saveSubmit} action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-10">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="fullname" className="block text-sm font-semibold leading-6">Full Name</label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="fullname"
                                    id="fullname"
                                    value={input.fullname}
                                    onChange={changeInput}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold leading-6">Username</label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={input.username}
                                    onChange={changeInput}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="birthdate" className="block text-sm font-semibold leading-6">BirthDate</label>
                            <div className="mt-2.5">
                                <input
                                    type="date"
                                    name="birthdate"
                                    id="birthdate"
                                    value={input.birthdate}
                                    onChange={changeInput}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold leading-6">Email</label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={input.email}
                                    onChange={changeInput}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-semibold leading-6">Gender</label>
                            <div className="mt-2.5">
                                <select
                                    type="date"
                                    name="gender"
                                    id="gender"
                                    value={input.gender}
                                    onChange={changeInput}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6">
                                    <option disabled>Select Gender</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="interest" className="block text-sm font-semibold leading-6">Interest</label>
                            <div className="mt-2.5">
                                <select
                                    type="interest"
                                    name="interest"
                                    id="interest"
                                    value={input.interest}
                                    onChange={changeInput}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" >
                                    <option className='m-10' disabled>Select Interest</option>
                                    <option className='m-10' value='male'>Male</option>
                                    <option className='m-10' value='female'>Female</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="show" className="block text-sm font-semibold leading-6">Show</label>
                            <div className="mt-2.5">
                                <select
                                    type="show"
                                    name="show"
                                    id="show"
                                    value={input.show}
                                    onChange={changeInput}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" >
                                    <option className='m-10' disabled>Select show</option>
                                    <option className='m-10' value='true'>Public</option>
                                    <option className='m-10' value='false'>Private</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-semibold leading-6">Address</label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={input.address}
                                    onChange={changeInput}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="profile-picture" className="block text-sm font-semibold leading-6">Profile Picture Url</label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="profile-picture"
                                    id="profile-picture"
                                    value={input.profilePicture}
                                    onChange={changeInput}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="occupation" className="block text-sm font-semibold leading-6">Occupation</label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="occupation"
                                    id="occupation"
                                    value={input.occupation}
                                    onChange={changeInput}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="bio" className="block text-sm font-semibold leading-6">Bio</label>
                            <div className="mt-2.5">
                                <textarea
                                    name="bio"
                                    id="bio"
                                    rows="4"
                                    value={input.bio}
                                    onChange={changeInput}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button type="submit" className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit Profile</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditProfilePage