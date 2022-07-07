import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {decodeToken} from "react-jwt";

import {ITokenPair, IUser} from "../../interfaces";
import {authService, userService} from "../../services";
import {IInitialState} from "../../interfaces/initial.state.interface";

const initialState: IInitialState = {
    access_token: '',
    active: false,
    user: null,
    tokenPair: {} as ITokenPair,
    refresh_token: '',
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
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, {dispatch}) => {
        const response = await authService.logout();
        dispatch(clearLocalStorage(response))
    }
)

export const getAll = createAsyncThunk(
    'auth/user',
    async (_, {dispatch}) => {
        const response = await userService.getAllUsers();
        dispatch(setUsers(response.data))
    });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: any) => {
            const access_token = action.payload.tokenPair.access_token
            const {role} = decodeToken(access_token) as string | any;
            localStorage.setItem('role', role);

            state.access_token = action.payload.tokenPair.access_token;
            state.refresh_token = action.payload.tokenPair.refresh_token;

            localStorage.setItem('access_token', action.payload.tokenPair.access_token);
            localStorage.setItem('refresh_token', action.payload.tokenPair.refresh_token);
            state.active = true;

            window.dispatchEvent(new Event("storage"));

            state.user = action.payload.user;
            state.tokenPair = action.payload.tokenPair as ITokenPair;
        },
        setUsers: (state, action: any) => {
            console.log('-----------------');
            console.log(action.payload);
            console.log('-----------------');
            // state.users = action.payload
        },
        clearLocalStorage: (state, action) => {
            console.log(action.payload);
            state.refresh_token = '';
            localStorage.clear()
            window.dispatchEvent(new Event("storage"));
        }
    }
});

const authReducer = authSlice.reducer;
export default authReducer;

export const {
    setToken,
    setUsers,
    clearLocalStorage,
} = authSlice.actions
