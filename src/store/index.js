import {
  combineReducers,
  configureStore,
  // getDefaultMiddleware,
} from '@reduxjs/toolkit';
import userSlice from './feature/userSlice';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  user: userSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  //   middleware: getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

// 참조: https://velog.io/@760kry/Redux-Toolkit
