import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {decodeToken} from "react-jwt";

import {ITokenPair, IUser} from "../../interfaces";
import {authService, userService} from "../../services";
import {IInitialState} from "../../interfaces/initial.state.interface";

const initialState: IInitialState = {
    access_token: '',
    status: '',
    error: '',
    active: false,
    users: [] as IUser[],
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
        await authService.logout();
        return localStorage.clear()
        // dispatch(clearLocalStorage(response))
    }
)

export const getAll = createAsyncThunk(
    'auth/users',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAllUsers();
            return data;
        } catch (e) {
            return rejectWithValue(e)
        }

    });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: any) => {
            if (action.payload.statusCode === 404) {
                state.error = action.payload.message
            }
            const access_token = action.payload.tokenPair.access_token
            const {role, id} = decodeToken(access_token) as string | any;
            localStorage.setItem('role', role);

            state.access_token = action.payload.tokenPair.access_token;
            state.refresh_token = action.payload.tokenPair.refresh_token;

            localStorage.setItem('access_token', action.payload.tokenPair.access_token);
            localStorage.setItem('refresh_token', action.payload.tokenPair.refresh_token);
            localStorage.setItem('userId', id);

            state.active = true;

            state.user = action.payload.user;
            state.tokenPair = action.payload.tokenPair as ITokenPair;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state) => {
            state.status = 'pending';
        })

        builder.addCase(getAll.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = 'fulfilled';
        })
    }
});

const authReducer = authSlice.reducer;
export default authReducer;

export const {
    setToken,
} = authSlice.actions
