import { apiSlice } from '../../baseApi';
import { API_BASE_URIS } from '../../../constants/siteConstants';

const JOB_POST_URL = API_BASE_URIS.Recruiter + '/post';

export const rcUploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        rcGetSingleJobPost: builder.query({
            query: (postId) => `${JOB_POST_URL}/${postId}`,
            transformResponse: (response, meta, arg) => response.data,
        }),
        rcGetJobPosts: builder.query({
            query: (data) => ({
                url: `${JOB_POST_URL}/list`,
                method: 'POST',
                body: data,
            }),
            transformResponse: (response, meta, arg) => response.data,
        }),
        rcCountJobPosts: builder.mutation({
            query: () => ({
                url: `${JOB_POST_URL}/count`,
                method: 'POST',
            })
        }),
        rcAddSingleJobPost: builder.mutation({
            query: (data) => ({
                url: `${JOB_POST_URL}/add`,
                method: 'POST',
                body: data,
            })
        }),
        rcUpdateSingleJobPost: builder.mutation({
            query: ({ postId, ...data }) => ({
                url: `${JOB_POST_URL}/update/${postId}`,
                method: 'PUT',
                body: data,
            })
        }),
        rcPartialUpdateSingleJobPost: builder.mutation({
            query: ({ postId, data }) => ({
                url: `${JOB_POST_URL}/partial-update/${postId}`,
                method: 'PUT',
                body: data,
            })
        }),
        rcDeleteSingleJobPost: builder.mutation({
            query: (postId) => ({
                url: `${JOB_POST_URL}/delete/${postId}`,
                method: 'DELETE',
            })
        }),
        rcDeleteEntityUnderPost: builder.mutation({
            query: ({ postId, entity, entityId }) => ({
                url: `${JOB_POST_URL}/${postId}/${entity}/${entityId}`,
                method: 'POST',
            }),
        }),
        rcGetApplicationsOfJobPost: builder.mutation({
            query: (data) => ({
                url: `${JOB_POST_URL}/applications/list`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response, meta, arg) => response.data,
        }),
        rcGetAttachmentsOfJobPost: builder.query({
            query: (applicationId) => `${JOB_POST_URL}/applications/${applicationId}/attachments`,
        }),
        rcMarkReadOnApplicationOfJobPost: builder.mutation({
            query: (applicationId) => ({
                url: `${JOB_POST_URL}/applications/${applicationId}/read`,
                method: 'PUT',
            }),
        }),
        rcShortlistRejectApplicationOfJobPost: builder.mutation({
            query: ({ applicationId, data }) => ({
                url: `${JOB_POST_URL}/applications/${applicationId}/status`,
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const {
    useLazyRcGetSingleJobPostQuery,
    useRcGetJobPostsQuery,
    useRcCountJobPostsMutation,
    useRcAddSingleJobPostMutation,
    useRcUpdateSingleJobPostMutation,
    useRcDeleteSingleJobPostMutation,
    useRcPartialUpdateSingleJobPostMutation,
    useRcDeleteEntityUnderPostMutation,
    useRcGetApplicationsOfJobPostMutation,
    useLazyRcGetAttachmentsOfJobPostQuery,
    useRcMarkReadOnApplicationOfJobPostMutation,
    useRcShortlistRejectApplicationOfJobPostMutation,
} = rcUploadApiSlice;