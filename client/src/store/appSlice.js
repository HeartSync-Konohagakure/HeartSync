import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        accessToken: null,

    },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
    },
});

export const { setAccessToken } = appSlice.actions;

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

export default appSlice.reducer