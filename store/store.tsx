import { configureStore } from "@reduxjs/toolkit";
// configuring redux persist with redux toolkit
// ? redux-persist failed to create sync storage. falling back to noop storage.
// | Step 1: Import storage, persistReducer
import storage from 'redux-persist/lib/storage'
// https://github.com/rt2zz/redux-persist/issues/988
// import postsSliceReducer from "./StatesContainer/posts/postsSlice";
import userSliceReducer from "./StatesContainer/auth/AuthSlice";
import filtersSliceReducer from "./StatesContainer/filters/FilterSlice";
import postSliceReducer from "./StatesContainer/post/PostSlice";

// thunk middleware is used to handle async actions in redux
// import thunk from 'redux-thunk'
// ? redux-persist failed to create sync storage. falling back to noop storage.
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

// | Step 3: Configure persistConfig. Here key is the name of the state to be persisted
const persistConfig = {
  key: 'root',
  storage
};

// | Step 4: create a persisted reducer
const persistedReducer = persistReducer(persistConfig, userSliceReducer);

export const store = configureStore({
  reducer: {
    // posts: postsSliceReducer,
    // we access the state through this name "user" i.e., user.authData or user.loading or user.error
    // | Step 5: use the persisted reducer instead of the original reducer. Now head over to _app.tsx for the next step
    user: persistedReducer,
    filter: filtersSliceReducer,
    post : postSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // This line of code causing this Argument of type 'AsyncThunkAction<AxiosResponse<any, any>, SignUpFormData, {}>' is not assignable to parameter of type 'AnyAction'
  // middleware: [thunk],
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
