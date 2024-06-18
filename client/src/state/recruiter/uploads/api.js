import { apiSlice } from '../../baseApi';
import { API_BASE_URIS } from '../../../constants/siteConstants';

const UPLOAD_URL = API_BASE_URIS.Recruiter;

export const rcUploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        rcGetUploadAsset: builder.query({
            query: ({ profileId, uploadType }) => `${UPLOAD_URL}/${profileId}/${uploadType}`,
        }),
        rcUploadAsset: builder.mutation({
            query: ({ profileId, uploadType, data }) => ({
                url: `${UPLOAD_URL}/${profileId}/${uploadType}`,
                method: 'POST',
                body: data,
            })
        }),
        rcDeleteUploadAsset: builder.mutation({
            query: ({ profileId, uploadType }) => ({
                url: `${UPLOAD_URL}/${profileId}/${uploadType}`,
                method: 'DELETE',
            })
        })
    }),
});

export const {
    useLazyRcGetUploadAssetQuery,
    useRcUploadAssetMutation,
    useRcDeleteUploadAssetMutation,
} = rcUploadApiSlice;