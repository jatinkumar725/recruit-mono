import { apiSlice } from '../../baseApi';
import { API_BASE_URIS } from '../../../constants/siteConstants';

const SITE_JOB_POST_URL = API_BASE_URIS.Site_Jobs;

export const sitePostApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        siteGetJobPostDetails: builder.query({
            query: ({ postId, level = 2 }) => `${SITE_JOB_POST_URL}/job?skewid=${postId}&level=${level}`,
            transformResponse: (response, meta, arg) => response.data,
        }),
        siteGetRecentJobPosts: builder.query({
            query: ({ level = 2 }) => `${SITE_JOB_POST_URL}/jobs?level=${level}`,
            transformResponse: (response, meta, arg) => response.data,
        }),
        siteJobPostViews: builder.mutation({
            query: ({ postId }) => ({
                url: `${SITE_JOB_POST_URL}/job/viewed`,
                method: 'POST',
                body: { 
                    postId 
                },
            }),
            transformResponse: (response, meta, arg) => response.data,
        }),
    }),
});

export const {
    useSiteGetJobPostDetailsQuery,
    useSiteGetRecentJobPostsQuery,
    useSiteJobPostViewsMutation
} = sitePostApiSlice;