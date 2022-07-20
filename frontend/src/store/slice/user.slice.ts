import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "../../services";
import {IUser} from "../../interfaces";


export const initialState = {
    users: [] as IUser[],
    status: '',
    user: {} as IUser
}

export const getAllUsers = createAsyncThunk(
    'users/all',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAllUsers();
            return data;
        } catch (e) {
            return rejectWithValue(e)
        }

    });

export const getUserById = createAsyncThunk(
    'users/:id',
    async (id: string, {rejectWithValue}) => {
        try {
            const {data} = await userService.getUserById(id);
            return data;
        } catch (e) {
            rejectWithValue(e)
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.status = 'pending';
        })

        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = 'fulfilled';
        })

        builder.addCase(getUserById.pending, (state) => {
            state.status = 'pending';
        })

        builder.addCase(getUserById.fulfilled, (state, action) => {

        })
    }
});

const userReducer = userSlice.reducer;
export default userReducer;
const {} = userSlice.actions;
