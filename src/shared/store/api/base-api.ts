import { createApi } from '@reduxjs/toolkit/query';
import { axiosBaseQuery } from './axios-base-query';


export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Tasks', 'Auth'],
    endpoints: () => ({}),
});