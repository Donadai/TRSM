import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/posts/postSlice'
import poiReducer from '../features/pois/poiSlice'
import commentReducer from '../features/comments/commentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pois: poiReducer,
    posts: postReducer,
    comments: commentReducer
  },
});
