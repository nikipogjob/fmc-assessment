import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSuccessResponse, AuthUser } from './types';

interface AuthState {
    user: AuthUser | null;
    accessToken: string | null;
    isAuthChecked: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthChecked: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<AuthSuccessResponse>) {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthChecked = true;
        },

        setCurrentUser(state, action: PayloadAction<AuthUser | null>) {
            state.user = action.payload;
            state.isAuthChecked = true;
        },

        markAuthChecked(state) {
            state.isAuthChecked = true;
        },

        clearAuth(state) {
            state.user = null;
            state.accessToken = null;
            state.isAuthChecked = true;
        }
    }
});

export const {
    setCredentials,
    setCurrentUser,
    markAuthChecked,
    clearAuth
} = authSlice.actions;

export const authReducer = authSlice.reducer;