import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appSlice } from './app-slice';
import { baseApi } from './api/base-api';

const reducer = combineReducers({
    [appSlice.name]: appSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;