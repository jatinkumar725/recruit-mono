import { apiSlice } from '../../baseApi';
import { API_BASE_URIS } from '../../../constants/siteConstants';

const AUTH_URL = API_BASE_URIS.Recruiter + '/auth';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        rcRegister: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: 'POST',
                body: data,
            }),
        }),
        rcLogin: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        rcLogout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: 'POST',
            }),
        }),
        rcRequestVerificationEmail: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/requestVerifyEmail`,
                method: 'POST',
            })
        }),
        rcVerifyEmailAddress: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/verifyEmail`,
                method: 'POST',
                body: data
            })
        }),
        rcRequestResetPassword: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/forgot-password`,
                method: 'POST',
                body: data
            })
        }),
        rcRequestValidateResetPasswordCode: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/validate-otp`,
                method: 'POST',
                body: data
            })
        }),
        rcResetPassword: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/reset-password`,
                method: 'PUT',
                body: data
            })
        }),
    }),
});

export const {
    useRcRegisterMutation,
    useRcLoginMutation,
    useRcLogoutMutation,
    useRcRequestVerificationEmailMutation,
    useRcVerifyEmailAddressMutation,
    useRcRequestResetPasswordMutation,
    useRcRequestValidateResetPasswordCodeMutation,
    useRcResetPasswordMutation,
} = authApiSlice;