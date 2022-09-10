import { configureStore } from "@reduxjs/toolkit";
// import postsSliceReducer from "./StatesContainer/posts/postsSlice";
import userSliceReducer from "./StatesContainer/auth/AuthSlice";

export const store = configureStore({
  reducer: {
    // posts: postsSliceReducer,
    // we access the state through this name "user" i.e., user.authData or user.loading or user.error
    user: userSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
