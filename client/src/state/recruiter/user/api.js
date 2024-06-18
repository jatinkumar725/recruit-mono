import { apiSlice } from '../../baseApi';
import { API_BASE_URIS } from '../../../constants/siteConstants';

const USER_URL = API_BASE_URIS.Recruiter + '/user';

export const rcSeekerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        rcGetSeekerProfile: builder.query({
            query: (seekerId) => ({
                url: `${USER_URL}/search/seeker/${seekerId}`,
                method: 'POST'
            }),
            transformResponse: (response) => response.data,
        }),
        rcGetSeekerResume: builder.query({
            query: (profileId) => `${USER_URL}/search/seeker/${profileId}/resume`,
            transformResponse: (response) => response.data,
        }),
    }),
});

export const {
    useLazyRcGetSeekerProfileQuery,
    useLazyRcGetSeekerResumeQuery,
} = rcSeekerApiSlice;