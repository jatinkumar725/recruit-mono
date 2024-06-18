import { apiSlice } from '../../baseApi';
import { API_BASE_URIS } from '../../../constants/siteConstants';

const USER_URL = API_BASE_URIS.Recruiter + '/user';

export const rcMeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        rcGetDashboard: builder.query({
            query: (level = 1) => `${USER_URL}/dashboard`,
            transformResponse: (response) => response.data,
        }),
        rcGetMe: builder.query({
            query: (level = 1) => `${USER_URL}/me?level=${level}`,
        }),
        rcChangePassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/change-password`,
                method: 'PUT',
                body: data,
            }),
        }),
        rcRequestChangeEmailAddress: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/change-email`,
                method: 'PUT',
                body: data,
            }),
        }),
        rcUpdateProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/update-profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        rcDeleteProfileEntity: builder.mutation({
            query: ({ entity, entityId }) => ({
                url: `${USER_URL}/self/profiles/${entity}/${entityId}`,
                method: 'POST',
            }),
        }),
        rcDeleteAccount: builder.mutation({
            query: () => ({
                url: `${USER_URL}/delete/me`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useRcGetDashboardQuery,
    useRcGetMeQuery,
    useRcChangePasswordMutation,
    useRcRequestChangeEmailAddressMutation,
    useRcUpdateProfileMutation,
    useRcDeleteProfileEntityMutation,
    useRcDeleteAccountMutation,
} = rcMeApiSlice;