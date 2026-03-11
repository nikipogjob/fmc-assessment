import { baseApi } from '@/shared/store/api/base-api';
import { AuthSuccessResponse, AuthUser, LoginRequest, LogoutResponse, RegisterRequest } from '../model/types';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthSuccessResponse, RegisterRequest>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                data: body
            }),
        }),

        login: builder.mutation<AuthSuccessResponse, LoginRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                data: body,
            }),
        }),

        me: builder.query<AuthUser, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
            }),
            providesTags: ['Auth'],
        }),
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useMeQuery,
    useLogoutMutation
} = authApi;