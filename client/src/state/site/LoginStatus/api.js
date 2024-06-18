import { apiSlice } from '../../baseApi';
import { API_BASE_URIS } from '../../../constants/siteConstants';

const SITE_LOGIN_STATUS_URL = API_BASE_URIS.Site_Login_Status;

export const loginStatusApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLoginStatus: builder.query({
            query: () => SITE_LOGIN_STATUS_URL,
        }),
    }),
});

export const {
    useLazyGetLoginStatusQuery,
} = loginStatusApiSlice;