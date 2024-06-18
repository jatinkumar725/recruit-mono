import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dbService from '../../../db/dbService'; // Adjust the import

const { get, set, delete: deleteData } = dbService;
const STORE_NAME = 'rp_app_store';

async function getTimeStampInfo() {
  const userInfo = await get(STORE_NAME, 'rp_rc');
  return userInfo && userInfo.timestamp;
}

async function getUserInfo() {
  const userInfo = await get(STORE_NAME, 'rp_rc');
  return userInfo && userInfo.userDetails; // Adjust the function call
}

async function setUserInfo(userInfo) {
  await set(STORE_NAME, 'rp_rc', userInfo); // Adjust the function call
}

const initialState = {
  loggedUserInfo: null,
  timestamp: null,
};

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async () => {
    const loggedUserInfo = await getUserInfo();
    const timestamp = await getTimeStampInfo();
    return { loggedUserInfo, timestamp };
  }
);

const authSlice = createSlice({
  name: 'rcAuth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Update loggedUserInfo
      const data = action.payload;
      state.loggedUserInfo = data;

      // Update timestamp
      const timestamp = Date.now();
      state.timestamp = timestamp;

      setUserInfo({
        userDetails: data,
        timestamp: timestamp,
      });
    },
    setUpdateTimeStamp: (state, action) => {
      // Update timestamp
      const timestamp = Date.now();
      state.timestamp = timestamp;

      const data = { ...state.loggedUserInfo };

      setUserInfo({
        userDetails: data,
        timestamp: timestamp,
      });
    },
    updateUserInfo: (state, action) => {
      // Update loggedUserInfo
      const { field, data } = action.payload;
      state.loggedUserInfo[field] = data;

      // Update timestamp
      const timestamp = Date.now();
      state.timestamp = timestamp;

      setUserInfo({
        userDetails: state.loggedUserInfo,
        timestamp: timestamp,
      });
    },
    setEmailVerified: (state, action) => {
      // Update timestamp
      const timestamp = Date.now();
      state.timestamp = timestamp;

      const data = {
        ...state.loggedUserInfo,
        isPrimaryEmailVerified: true,
      };

      setUserInfo({
        userDetails: data,
        timestamp: timestamp,
      });
    },
    logout: (state, action) => {
      state.loggedUserInfo = null;
      state.timestamp = null;
      
      // Delete data from IndexedDB
      deleteData(STORE_NAME, 'rp_rc');
    },
  },
  extraReducers: (builder) => {
    // Extra reducers for handling IndexedDB initialization
    builder.addCase(initializeAuth.fulfilled, (state, action) => {
      state.loggedUserInfo = action.payload.loggedUserInfo;
      state.timestamp = action.payload.timestamp;
    });
  },
});

export const { setCredentials, updateUserInfo, setUpdateTimeStamp, setEmailVerified, logout } = authSlice.actions;

export default authSlice.reducer;