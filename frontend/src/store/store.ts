import {combineReducers, configureStore} from "@reduxjs/toolkit";

import authReducer from "./slice/auth.slice";
import localityReducer from "./slice/locality.slice";
import orderReducer from "./slice/order.slice";

const rootReducer = combineReducers({
    authReducer,
    localityReducer,
    orderReducer,
})
export const setupStore = () => configureStore({
    reducer: rootReducer,
})
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
