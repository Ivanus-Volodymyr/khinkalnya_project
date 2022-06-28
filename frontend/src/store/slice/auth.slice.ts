import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IUser} from "../../interfaces";
import {authService} from "../../services";

const initialState = {
    result: [],
    accessToken: '',
    response: {}
}
export const registrationUser = createAsyncThunk(
    'registration/user',
    async (data: IUser) => {
        let response = await authService.registration(data);
    }
)

export const loginUser = createAsyncThunk(
    'login/user',
    async (data: IUser, {dispatch, getState}) => {
        let response = await authService.login(data);
        dispatch(setToken(response))
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: any) => {
            state.accessToken=action.payload.data.tokenPair.accessToken;

        }
    }
});

const authReducer = authSlice.reducer;
export default authReducer;

export const {
    setToken
} = authSlice.actions
