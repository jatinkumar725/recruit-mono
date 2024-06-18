import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  me: null, // Initial employees array
  onlineProfiles: [], // Initial onlineProfiles array
};

const skProfileSlice = createSlice({
  name: 'skUserProfile',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.me = action.payload;
    },
    changePassword(state, action) {
      // Handle change password action if needed
    },
    updateProfile(state, action) {
      // Handle update profile action if needed
    },
    deleteMe(state, action) {
      // Handle delete me action if needed
    },
    mnjOnlineProfile(state, action) {
      state.onlineProfiles = state.onlineProfiles.concat(action.payload);
    },
    deleteOnlineProfile(state, action) {
      state.onlineProfiles = state.onlineProfiles.filter(onlineProfile => onlineProfile.ogId !== action.payload );
    }
  },
});

export const {
  setProfile,
  changePassword,
  updateProfile,
  deleteMe,
  mnjOnlineProfile,
  deleteOnlineProfile,
} = skProfileSlice.actions;

export default skProfileSlice.reducer;