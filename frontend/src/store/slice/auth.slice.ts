import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IUser} from "../../interfaces";
import {authService, userService} from "../../services";

const initialState = {
    result: [],
    accessToken: '',
    response: {}
}
export const registrationUser = createAsyncThunk(
    'auth/registration',
    async (data: IUser, {dispatch}) => {
        const response = await authService.registration(data);
        dispatch(setToken(response.data))
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (data: Partial<IUser>, {dispatch}) => {
        const response = await authService.login(data);
        dispatch(setToken(response.data))
    }
)

// export const getAll = createAsyncThunk(
//     'auth/user',
//     async (accessToken: string) => {
//     const response = await userService.getAllUsers(accessToken);
//         console.log(response);
//     });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: any) => {
            console.log(action.payload);
            // state.accessToken = action.payload.data.tokenPair.accessToken;

        }
    }
});

const authReducer = authSlice.reducer;
export default authReducer;

export const {
    setToken
} = authSlice.actions
