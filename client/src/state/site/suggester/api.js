import { apiSlice } from '../../baseApi';
import { API_BASE_URIS } from '../../../constants/siteConstants';

const SUGGESTER_URL = API_BASE_URIS.Taxonomy + '/suggester';

export const siteSuggestorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        siteSearchTerms: builder.mutation({
            query: ({ search_query, category, method, returnFields = 'name,termId' }) => {
                let queryString = `${SUGGESTER_URL}?`;
                queryString += `query=${search_query.length ? encodeURIComponent(search_query) : ""}&`;
          
                if (method) {
                    queryString += `method=${encodeURIComponent(method)}&`;
                }

                if (category) {
                    queryString += `category=${encodeURIComponent(category)}&`;
                }
                if (returnFields) {
                    queryString += `returnFields=${returnFields}&`;
                }
                // Remove the trailing '&' if present
                queryString = queryString.replace(/&$/, '');
                return queryString;
            },
            transformResponse: (response, meta, arg) => response?.data?.data,
        }),
        seSuggestEntity: builder.query({
            query: ({ category, type }) => {
                let queryString = `client/cloud-aggregator-service/v1/object/${type}/education?`;
                if (category) {
                    queryString += `category=${encodeURIComponent(category)}&`;
                }
                // Remove the trailing '&' if present
                queryString = queryString.replace(/&$/, '');
                return queryString;
            },
            transformResponse: (response, meta, arg) => response?.data?.data,
        }),
    }),
});

export const {
    useSiteSearchTermsMutation,
    useLazySeSuggestEntityQuery,
} = siteSuggestorApiSlice;