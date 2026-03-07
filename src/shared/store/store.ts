import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appSlice } from './app-slice';

const reducer = combineReducers({
    [appSlice.name]: appSlice.reducer
});

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;