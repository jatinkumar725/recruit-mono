import { configureStore } from '@reduxjs/toolkit';
import skAuthReducer from './seeker/authentication/slice';
import rcAuthReducer from './recruiter/authentication/slice';
// import skProfileReducer from './seeker/profile/slice';

import { apiSlice } from './baseApi';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    skAuth: skAuthReducer,
    rcAuth: rcAuthReducer,
    // skUserProfile: skProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;