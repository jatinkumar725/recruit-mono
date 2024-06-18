import { apiSlice } from '../../baseApi';
import { API_BASE_URIS } from '../../../constants/siteConstants';

const USER_URL = API_BASE_URIS.Seeker + '/user';

export const skMeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        skGetMe: builder.query({
            query: (level = 1) => `${USER_URL}/me?level=${level}`,
        }),
        skChangePassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/change-password`,
                method: 'PUT',
                body: data,
            }),
        }),
        skChangeEmailAddress: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/change-email`,
                method: 'PUT',
                body: data,
            }),
        }),
        skUpdateProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/update-profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        skDeleteProfileEntity: builder.mutation({
            query: ({ entity, entityId }) => ({
                url: `${USER_URL}/self/profiles/${entity}/${entityId}`,
                method: 'POST',
            }),
        }),
        skDeleteAccount: builder.mutation({
            query: () => ({
                url: `${USER_URL}/delete/me`,
                method: 'DELETE',
            }),
        }),
        skMnjOnlineProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/self/profiles`,
                method: 'POST',
                body: data,
            })
        }),
        skDeleteOnlineProfile: builder.mutation({
            query: (ogId) => ({
                url: `${USER_URL}/self/profiles/${ogId}`,
                method: 'POST',
            })
        }),
        skMnjProject: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/self/projects`,
                method: 'POST',
                body: data,
            })
        }),
        skDeleteProject: builder.mutation({
            query: (projectId) => ({
                url: `${USER_URL}/self/projects/${projectId}`,
                method: 'POST',
            })
        }),
    }),
});

export const {
    useSkGetMeQuery,
    useSkChangePasswordMutation,
    useSkChangeEmailAddressMutation,
    useSkUpdateProfileMutation,
    useSkDeleteProfileEntityMutation,
    useSkDeleteAccountMutation,
    useSkMnjOnlineProfileMutation,
    useSkDeleteOnlineProfileMutation,
    useSkMnjProjectMutation,
    useSkDeleteProjectMutation,
} = skMeApiSlice;