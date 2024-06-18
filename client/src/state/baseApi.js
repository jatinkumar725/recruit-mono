import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

// Custom baseQuery with authentication handling
const baseQuery = async (args, api, extraOptions) => {
  const token = Cookies.get('rp_at') ?? Cookies.get('rpc_at');

  const result = await fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers) => {
      if (token) {
        // include token in req header
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  return result;
};

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Authentication'],
  endpoints: (builder) => ({}),
});