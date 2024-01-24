import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userProfileFetch } from '../store/appSlice'

const ProfilePage = () => {

    let dispatch = useDispatch();
    let { userProfile } = useSelector((state) => state.appReducer)

    function formatterDate(value) {
        let date = new Date(value);
        let year = date.getFullYear();
        let month = `${date.getMonth() + 1}`.padStart(2, '0');
        let day = `${date.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        dispatch(userProfileFetch());
    }, []);

    return (
        <>
            <div className='flex items-center justify-center h-screen'>
                <div className='mx-auto bg-white rounded-3xl shadow-xl'>
                    <div className="grid rounded-3xl max-w-[240px] sm:max-w-[300px] shadow-sm bg-slate-100 flex-col">
                        <img
                            src={userProfile.UserProfile?.profilePicture}
                            width="300"
                            height="200"
                            className="rounded-t-3xl justify-center grid h-80 object-cover"
                            alt="movie.title"
                        />

                        <div className="group p-6 grid z-10">
                            <a
                                href=''
                                className="group-hover:text-cyan-700 font-bold sm:text-2xl line-clamp-2"
                            >
                                {userProfile?.UserProfile?.fullname}
                            </a>
                            <span className="text-slate-400 pt-2 font-semibold">
                                {(userProfile.gender)}
                            </span>
                            <div className="h-23">
                                <span className="line-clamp-4 py-2 text-sm font-light leading-relaxed">
                                    {userProfile?.UserProfile?.bio}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="font-black flex flex-col">
                                    <span className="text-l flex gap-x-1 items-center group-hover:text-yellow-600">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 19v-9m3-4H5.5a2.5 2.5 0 1 1 0-5C7 1 8.375 2.25 9.375 3.5M12 19v-9m-9 0h14v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8ZM2 6h16a1 1 0 0 1 1 1v3H1V7a1 1 0 0 1 1-1Zm12.155-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z" />
                                        </svg>
                                        {formatterDate(userProfile?.UserProfile?.birthdate)}
                                    </span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="h-2" />
                                    <span className="text-l font-bold text-slate-300">
                                        <button className="btn btn-primary">Edit Profile</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
