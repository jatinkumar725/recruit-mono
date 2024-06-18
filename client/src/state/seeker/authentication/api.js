import { apiSlice } from '../../baseApi';
import { API_BASE_URIS } from '../../../constants/siteConstants';

const AUTH_URL = API_BASE_URIS.Seeker + '/auth';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        skRegister: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: 'POST',
                body: data,
            }),
        }),
        skLogin: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        skLogout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: 'POST',
            }),
        }),
        skRequestVerificationEmail: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/requestVerifyEmail`,
                method: 'POST',
            })
        }),
        skVerifyEmailAddress: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/verifyEmail`,
                method: 'POST',
                body: data
            })
        }),
        skSignInWithGoogle: builder.query({
            query: () => `${AUTH_URL}/login/google`
        }),
        skRequestResetPassword: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/forgot-password`,
                method: 'POST',
                body: data
            })
        }),
        skRequestValidateResetPasswordCode: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/validate-otp`,
                method: 'POST',
                body: data
            })
        }),
        skResetPassword: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/reset-password`,
                method: 'PUT',
                body: data
            })
        }),
    }),
});

export const {
    useSkRegisterMutation,
    useSkLoginMutation,
    useSkLogoutMutation,
    useSkRequestVerificationEmailMutation,
    useSkVerifyEmailAddressMutation,
    useLazySkSignInWithGoogleQuery,
    useSkRequestResetPasswordMutation,
    useSkRequestValidateResetPasswordCodeMutation,
    useSkResetPasswordMutation,
} = authApiSlice;