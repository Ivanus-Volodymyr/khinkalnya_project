import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {ITokenPair, IUser} from "../../interfaces";
import {authService, userService} from "../../services";
import {IInitialState} from "../../interfaces/initial.state.interface";

const initialState : IInitialState= {
    access_token: '',
    active: false,
    user: null,
    tokenPair: {} as ITokenPair,
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
    async (_) => {
        const access_token = localStorage.getItem('access_token') as string;
        const response = await userService.getAllUsers('jcndjncjkndjn');
        console.log(response);
        // dispatch(setUsers(response.data))
    });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: any) => {
            state.access_token = action.payload.tokenPair.access_token;
            localStorage.setItem('access_token', action.payload.tokenPair.access_token);
            localStorage.setItem('refresh_token', action.payload.tokenPair.refresh_token);
            state.active = true;
            state.user = action.payload.user;
            state.tokenPair = action.payload.tokenPair as ITokenPair;
        },
        setUsers: (state, action: any) => {
            console.log('-----------------');
            console.log(action.payload);
            console.log('-----------------');
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
