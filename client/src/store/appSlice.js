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
            throw error
        }
    }
}

export default appSlice.reducer