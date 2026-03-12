import { baseApi } from '@/shared/api/base-api';
import { AuthSuccessResponse, AuthUser, LoginRequest, LogoutResponse, RegisterRequest } from '../model/types';
import { authTokenStorage } from '@/shared/lib/storage/auth-token';
import { clearAuth, setCredentials, setCurrentUser } from '../model/auth-slice';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthSuccessResponse, RegisterRequest>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                data: body
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    authTokenStorage.set(data.accessToken);
                    dispatch(setCredentials(data));
                } catch {
                    authTokenStorage.remove();
                    dispatch(clearAuth());
                }
            }
        }),

        login: builder.mutation<AuthSuccessResponse, LoginRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                data: body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    authTokenStorage.set(data.accessToken);
                    dispatch(setCredentials(data));
                } catch {
                    authTokenStorage.remove();
                    dispatch(clearAuth());
                }
            }
        }),

        me: builder.query<AuthUser, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
            }),
            providesTags: ['Auth'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCurrentUser(data));
                } catch {
                    authTokenStorage.remove();
                    dispatch(clearAuth());
                }
            },
        }),
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } finally {
                    authTokenStorage.remove();
                    dispatch(clearAuth());
                }
            }
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useMeQuery,
    useLogoutMutation
} = authApi;