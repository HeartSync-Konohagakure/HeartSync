

const EditProfilePage = () => {

    return (
        <>
            <div class="isolate px-6 py-15 sm:py-20 lg:px-8">
                <div class="mx-auto max-w-2xl text-center">
                    <h2 class="text-2xl font-bold tracking-tight sm:text-xl">Update Your Profile </h2>
                </div>
                <form action="#" method="POST" class="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label for="full-name" class="block text-sm font-semibold leading-6">Full Name</label>
                            <div class="mt-2.5">
                                <input
                                    type="text"
                                    name="full-name"
                                    id="full-name"
                                    autocomplete="given-name"
                                    class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label for="username" class="block text-sm font-semibold leading-6">Username</label>
                            <div class="mt-2.5">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autocomplete="family-name"
                                    class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label for="birthdate" class="block text-sm font-semibold leading-6">BirthDate</label>
                            <div class="mt-2.5">
                                <input
                                    type="date"
                                    name="birthdate"
                                    id="birthdate"
                                    autocomplete="given-name"
                                    class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-semibold leading-6">Email</label>
                            <div class="mt-2.5">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autocomplete="family-name"
                                    class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label for="gender" class="block text-sm font-semibold leading-6">Gender</label>
                            <div class="mt-2.5">
                                <select
                                    type="date"
                                    name="gender"
                                    id="gender"
                                    autocomplete="given-name"
                                    class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6">
                                    <option disabled>Select Gender</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label for="interest" class="block text-sm font-semibold leading-6">Interest</label>
                            <div class="mt-2.5">
                                <select
                                    type="interest"
                                    name="interest"
                                    id="interest"
                                    autocomplete="family-name"
                                    class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" >
                                    <option className='m-10' disabled>Select Interest</option>
                                    <option className='m-10' value='male'>Male</option>
                                    <option className='m-10' value='female'>Female</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label for="show" class="block text-sm font-semibold leading-6">Show</label>
                            <div class="mt-2.5">
                                <select
                                    type="show"
                                    name="show"
                                    id="show"
                                    autocomplete="family-name"
                                    class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" >
                                    <option className='m-10' disabled>Select show</option>
                                    <option className='m-10' value='true'>Public</option>
                                    <option className='m-10' value='false'>Private</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label for="address" class="block text-sm font-semibold leading-6">Address</label>
                            <div class="mt-2.5">
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    autocomplete="family-name"
                                    class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="profile-picture" class="block text-sm font-semibold leading-6">Profile Picture Url</label>
                            <div class="mt-2.5">
                                <input 
                                type="text" 
                                name="profile-picture" 
                                id="profile-picture" 
                                autocomplete="profile-picture" 
                                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="bio" class="block text-sm font-semibold leading-6">Bio</label>
                            <div class="mt-2.5">
                                <textarea name="bio" id="bio" rows="4" class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="mt-10">
                        <button type="submit" class="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit Profile</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditProfilePage