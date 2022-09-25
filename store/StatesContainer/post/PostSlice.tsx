import { createSlice } from "@reduxjs/toolkit";

type Post = {
  title: string;
  description: string;
  featuredImage: File | null | Blob;
  content: string;
}

const initialState = {
  title: "",
  description: "",
  featuredImage: null,
  content: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setFeaturedImage: (state, action) => {
      state.featuredImage = action.payload;
    },
  },
});

export const { setTitle, setDescription, setFeaturedImage } = postSlice.actions;

export default postSlice.reducer;
