import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  authInfo: { name: 'test' }, // { accessToken, refreshToken, userId, name, nickname, profile }
};

// reducer + action
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthInfo: (state, action) => {
      state.authInfo = action.payload;
    },
  },
});

export const { setAuthInfo } = userSlice.actions;

export default userSlice.reducer;
