import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        accessToken: null,
        userProfile: {},
       

    },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        changeUserProfile: (state, action) => {
            state.userProfile = action.payload
        },
    },
});

export const { setAccessToken, changeUserProfile } = appSlice.actions;

export const register = (input) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3000/register', input);

            Swal.fire({
                title: 'Success!',
                text: 'Your registration is successful',
                icon: 'success',
            });

            console.log(response.data);

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.message}`,
            });

            dispatch(changeErrorMessage(error.response.data.message));
            dispatch(changeIsError(true));

            throw error;
        }
    };
};

export const login = (input) => async (dispatch) => {
    try {
        const { data } = await axios.post('http://localhost:3000/login', input);

        localStorage.access_token = data.access_token;

        dispatch(setAccessToken(data.access_token));

        console.log(data);
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
        });
    }
};

export const userProfileFetch = () => {
    return async (dispatch) => {
        try {
            let link = "http://localhost:3000/users/profile"
            let { data } = await axios({
                method: 'get',
                url: link,
                headers: {
                    Authorization: 'Bearer ' + localStorage.access_token
                }
            })
            dispatch(changeUserProfile(data))
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            })
        }
    }
}

export const saveSubmitUpdated = (input) => {
    return async (dispatch) => {
        try {
            let link = "http://localhost:3000/users"
            await axios({
                method: 'put',
                url: link,
                data: input,
                headers: {
                    Authorization: 'Bearer ' + localStorage.access_token
                }
            })
            Swal.fire({
                title: "Success!",
                text: "Updated successfully",
                icon: "success"
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            })
        }
    }
}


export default appSlice.reducer