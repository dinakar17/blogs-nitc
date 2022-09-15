// AuthSlice : Piece of State that stores all the user login information

// * Step 1: Import createSlice and createAsyncThunk (for asynchronous actions)
// createSlice - creates a slice of state and returns an object with the action creators and reducer
// createAsyncThunk - creates an asynchronous thunk action creator that returns a promise containing the action object when the promise is fulfilled or rejected with an error object
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../../api/index";
import { SignInFormData, SignUpFormData } from "../../../types";

interface AuthState {
  authData: any;
  loading: boolean;
  error: string;
  signUpSuccess: boolean;
}

// * Step 2: Initialize initialState
const initialState: AuthState = {
  loading: false,
  authData: null,
  error: "",
  signUpSuccess: false,
};

// * Step 3: Configure Asynchronous action creators
// Note: signIn is an asynchronous action creator that goes through 3 stages(just like ascending a stairs to reach a goal):
// 1. signIn.pending: the action creator returns a promise
// 2. signIn.fulfilled: the promise is resolved and the action creator returns the response data
// 3. signIn.rejected: the promise is rejected and the action creator returns the error
export const signIn = createAsyncThunk(
  // "auth/signIn" is the name of Action type that will be dispatched when the action creator is called
  "auth/signIn",
  async (signInDetails: SignInFormData) => {
    const response = await api.signIn(signInDetails);
  // response.data - { status: 'success', token, data: { user: { _id: '5f9e9b9b9b9b9b9b9b9b9b9b', name: 'John Doe', email: 'john@gmail.com', role: undefined, isVerified: undefined } } }
    return response.data;
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (signUpDetails: SignUpFormData) => {
    // Example of AxiosResponse object returned by the API. For more info visit https://zetcode.com/javascript/axios/
    // { status: 200, data: { status: "success", message: "User created successfully" }, headers: {…}, config: {…}, request: {…}, statusText: "OK" }
    const response = await api.signUp(signUpDetails);
    return response.data;
  }
);

// * Step 4: Create the Slice (piece of State)
const authSlice = createSlice({
  name: "auth",
  initialState,
  // reducers is an object that contains all the action creators that are synchronous in nature
  reducers: {
    logOut: (state) => {
      state.authData = null;
      state.loading = false;
      state.error = "";
      localStorage.removeItem("profile");
    },
  },
  // extraReducers - allows us to handle actions that are not created by createSlice or createAsyncThunk (e.g. signIn)
  extraReducers: (builder) => {
    // builder.addCase() adds a case reducer for a specific action type to the builder callback function
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      // console.log("pending"); For debugging
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      // response.data === action.payload
      state.authData = action.payload;
      // As soon as we logged in we add the profile to localStorage
      localStorage.setItem("profile", JSON.stringify(action.payload));
      // console.log(`AuthData: action.payload`);
      // console.log(`LocalStore: localStorage.getItem("profile")`);
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.authData = null;
      // Here action.error.message is the *automatic message* generated when the logic in signUp function fails!
      // Ex: If we use navigate.push("/projects") then action.error.message = "navigate.push is not a function"
      state.error = action.error.message as string;
    });

    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.authData = action.payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.authData = null;
      state.error = action.error.message as string;
    });
  },
});

//* Step 5: Default Export the reducer
export default authSlice.reducer;

export const { logOut } = authSlice.actions;
//* Step 6: pass the reducer (which triggers state mutation) to the configureStore

//* Step 7: Export the store and feed to it to the React component tree