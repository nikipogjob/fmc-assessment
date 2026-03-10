import { axiosInstance } from './axios-instance';
import { AxiosError } from 'axios';

interface AxiosBaseQueryArgs {
    url: string,
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    data?: unknown,
    params?: unknown
}

export const axiosBaseQuery = () =>
    async ({ url, method = 'GET', data, params }: AxiosBaseQueryArgs) => {
        try {
            const result = await axiosInstance({
                url,
                method,
                data,
                params,
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
