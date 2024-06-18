import { apiSlice } from '../../baseApi';
import { API_BASE_URIS } from '../../../constants/siteConstants';

const SAVED_SEEKER_URL = API_BASE_URIS.Recruiter + '/skprofile';

export const rcUploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        rcGetSavedSeekers: builder.query({
            query: ({ profileId }) => ({
                url: `${SAVED_SEEKER_URL}/${profileId}/list`,
                method: 'POST',
            }),
            transformResponse: (response) => response.data.data
        }),
        rcSaveSeeker: builder.mutation({
            query: (data) => ({
                url: `${SAVED_SEEKER_URL}/save`,
                method: 'POST',
                body: data,
            }),
            transformResponse: (response) => response.data,
        }),
        rcDeleteSavedSeeker: builder.mutation({
            query: (savedSeekerId) => ({
                url: `${SAVED_SEEKER_URL}/delete/${savedSeekerId}`,
                method: 'DELETE',
            }),
            transformResponse: (response) => response.data
        })
    }),
});

export const {
    useRcGetSavedSeekersQuery,
    useRcSaveSeekerMutation,
    useRcDeleteSavedSeekerMutation,
} = rcUploadApiSlice;