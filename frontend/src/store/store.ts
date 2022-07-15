import {combineReducers, configureStore} from "@reduxjs/toolkit";

import authReducer from "./slice/auth.slice";
import localityReducer from "./slice/locality.slice";

const rootReducer = combineReducers({
    authReducer,
    localityReducer,
})
export const setupStore = () => configureStore({
    reducer: rootReducer,
})
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
