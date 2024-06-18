import { apiSlice } from '../../baseApi';
import { API_BASE_URIS } from '../../../constants/siteConstants';

const UPLOAD_URL = API_BASE_URIS.Seeker;

export const skUploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        skGetUploadAsset: builder.query({
            query: ({ profileId, uploadType }) => `${UPLOAD_URL}/${profileId}/${uploadType}`,
        }),
        skUploadAsset: builder.mutation({
            query: ({ profileId, uploadType, data }) => ({
                url: `${UPLOAD_URL}/${profileId}/${uploadType}`,
                method: 'POST',
                body: data,
            })
        }),
        skDeleteUploadAsset: builder.mutation({
            query: ({ profileId, uploadType }) => ({
                url: `${UPLOAD_URL}/${profileId}/${uploadType}`,
                method: 'DELETE',
            })
        })
    }),
});

export const {
    useLazySkGetUploadAssetQuery,
    useSkUploadAssetMutation,
    useSkDeleteUploadAssetMutation,
} = skUploadApiSlice;