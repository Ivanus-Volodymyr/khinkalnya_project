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
    async (_, {dispatch, getState}) => {
        const state = getState() as {authReducer: IInitialState}
        const tokenPair = state.authReducer.tokenPair;
        console.log(tokenPair);

        const response = await userService.getAllUsers(tokenPair.access_token, tokenPair.authorId);
        dispatch(setUsers(response.data))
    });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: any) => {
            state.access_token = action.payload.tokenPair.access_token;
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
