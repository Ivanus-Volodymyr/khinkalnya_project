import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "../../services";
import {IUser} from "../../interfaces";


export const initialState = {
    users: [] as IUser[],
    status: '',
}

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

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getAll.pending, (state) => {
            state.status = 'pending';
        })

        builder.addCase(getAll.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = 'fulfilled';
        })
    }
});

const userReducer = userSlice.reducer;
export default userReducer;
const {

} = userSlice.actions;
