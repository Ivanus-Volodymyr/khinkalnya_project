import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IUser} from "../../interfaces";
import {authService, userService} from "../../services";

const initialState = {
    access_token: '',
    users: [],
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

export const getAll = createAsyncThunk(
    'auth/user',
    async (_, {dispatch, getState}) => {
        const state = getState() as { access_token: string }

        const response = await userService.getAllUsers('andrew milovich');
        dispatch(setUsers(response.data))
    });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: any) => {
            state.access_token = action.payload.tokenPair.access_token;
        },
        setUsers: (state, action: any) => {
            console.log(action.payload);
            // state.users = action.payload
        }
    }
});

const authReducer = authSlice.reducer;
export default authReducer;

export const {
    setToken,
    setUsers,
} = authSlice.actions
