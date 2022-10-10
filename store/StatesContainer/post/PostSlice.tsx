import { createSlice } from "@reduxjs/toolkit";

type Post = {
  title: string;
  description: string;
  featuredImage: File | null | Blob;
  featuredImageURL: string;
  tags: string[];
  content: string;
  status: {
    reviewed: boolean;
    draft: boolean;
    anonymous: boolean;
  };
};

const initialState: Post = {
  title: "",
  description: "",
  featuredImage: null,
  featuredImageURL: "",
  tags: [],
  content: "",
  status: {
    reviewed: false,
    draft: false,
    anonymous: false,
  },
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
    setFeaturedImageURL: (state, action) => {
      state.featuredImageURL = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setAnonymous: (state, action) => {
      state.status.anonymous = action.payload;
    },
    setPost: (state, action) => {
      // action.payload === data.data {object of all post data fields}
      state.title = action.payload.title;
      state.description = action.payload.description;
      // Note: We aren't using state.featuredImage since it is only for storing the file object
      state.featuredImageURL = action.payload.featuredImage;
      state.tags = action.payload.tags;
      state.content = action.payload.content;
      state.status.reviewed = action.payload.reviewed;
      state.status.draft = action.payload.draft;
      state.status.anonymous = action.payload.anonymous;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setDraft: (state, action) => {
      state.status.draft = action.payload;
    },
    resetPost: (state) => {
      state.title = "";
      state.description = "";
      state.featuredImage = null;
      state.featuredImageURL = "";
      state.content = "";
      state.tags = [];
      state.status.reviewed = false;
      state.status.draft = false;
      state.status.anonymous = false;
    },
  },
});

export const {
  setTitle,
  setDescription,
  setFeaturedImage,
  setFeaturedImageURL,
  setContent,
  setPost,
  setAnonymous,
  setTags,
  setDraft,
  resetPost
} = postSlice.actions;

export default postSlice.reducer;
