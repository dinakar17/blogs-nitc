import { createSlice } from "@reduxjs/toolkit";

type Post = {
  title: string;
  description: string;
  featuredImage: File | null | Blob;
  featuredImageURL: string;
  content: string;
};

const initialState: Post = {
  title: "",
  description: "",
  featuredImage: null,
  featuredImageURL: "",
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
    setPost: (state, action) => {
      // action.payload === data.data {object of all post data fields}
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.featuredImageURL = action.payload.featuredImage;
      state.content = action.payload.content;
    },
  },
});

export const { setTitle, setDescription, setFeaturedImage, setPost } = postSlice.actions;

export default postSlice.reducer;
