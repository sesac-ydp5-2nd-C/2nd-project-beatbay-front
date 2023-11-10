import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  authInfo: { name: 'test' }, // { accessToken, refreshToken, userId, name, nickname, profile }
  chatRoomInfo: null,
};

// reducer + action
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthInfo: (state, action) => {
      state.authInfo = action.payload;
    },
    setChatRoomInfo: (state, action) => {
      state.chatRoomInfo = action.payload;
    },
  },
});

export const { setAuthInfo, setChatRoomInfo } = userSlice.actions;

export default userSlice.reducer;
