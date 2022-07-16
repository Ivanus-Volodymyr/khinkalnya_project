import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {orderService} from "../../services/order.service";


const initialState = {
    orders: [] as any[]
}

export const getAllOrders = createAsyncThunk(
    'order/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getAll();
            return data
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const createOrder = createAsyncThunk(
    'order/create',
    async (data: any, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setOrder(data))
        } catch (e) {
            rejectWithValue(e)
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.orders.push(action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.orders = action.payload
        })
    }
});

const orderReducer = orderSlice.reducer;
export default orderReducer;

export const {
    setOrder,
} = orderSlice.actions;
