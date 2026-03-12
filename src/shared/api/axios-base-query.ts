import { authTokenStorage } from '@/shared/lib/storage/auth-token';
import { axiosInstance } from './axios-instance';
import { AxiosError, Method } from 'axios';

interface AxiosBaseQueryArgs {
    url: string,
    method?: Method,
    data?: unknown,
    params?: unknown,
    headers?: Record<string, string>,
}

export const axiosBaseQuery = () =>
    async ({ url, method = 'GET', data, params, headers }: AxiosBaseQueryArgs) => {
        try {
            const accessToken = authTokenStorage.get();

            const result = await axiosInstance({
                url,
                method,
                data,
                params,
                headers: {
                    ...headers,
                    ...(accessToken
                        ? { Authorization: `Bearer ${accessToken}` }
                        : {}),
                },
            });

            return { data: result.data };
        } catch (error) {
            const err = error as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };
