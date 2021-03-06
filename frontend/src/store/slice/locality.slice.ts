import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {localityService} from "../../services";
import {ILocality} from "../../interfaces/locality.interface";

const initialState = {
    locality: [] as ILocality[],
}

export const getAllLocality = createAsyncThunk(
    'locality/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await localityService.getAll();
            return data;
        } catch (e) {
            rejectWithValue(e)
        }
    }
)


const localitySlice = createSlice({
    name: 'locality',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllLocality.fulfilled, (state, action) => {
            if (action.payload) {
                state.locality = action.payload
            }
        })
    }
});


const localityReducer = localitySlice.reducer;
export default localityReducer;

export const {} = localitySlice.actions;
