import { apiSlice } from '../../baseApi';
import { API_BASE_URIS } from '../../../constants/siteConstants';

const USER_URL = API_BASE_URIS.Seeker + '/post';

export const skJobPostApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        skApplyToJobPost: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/apply`,
                method: 'POST',
                body: data
            })
        }),
        skGetAppliedJobPosts: builder.query({
            query: (data) => ({
                url: `${USER_URL}/apply/list`,
                method: 'POST',
                body: data,
            }),
            transformResponse: (response, meta, arg) => response.data,
        }),
    }),
});

export const {
    useSkApplyToJobPostMutation,
    useSkGetAppliedJobPostsQuery
} = skJobPostApiSlice;