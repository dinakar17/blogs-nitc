import axios, { AxiosRequestConfig } from "axios";
import { BlogPost, SignInFormData, SignUpFormData } from "../types";
import qs from "qs";

// axio.create() returns an instance of axios with a custom config
const API = axios.create({ baseURL: "http://localhost:5000" });
// change the content type of the request to application/x-www-form-urlencoded
API.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// create another instance of axios with a custom config
const API2 = axios.create({ baseURL: process.env.NEXT_PUBLIC_IMAGE_API_URL });
// set API2 content type to multipart/form-data
API2.defaults.headers.post["Content-Type"] = "multipart/form-data";
// add 'access-control-allow-origin' header to API2
API2.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

/*
Access to XMLHttpRequest at 'Server' from origin 'Client' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
*/

// API.interceptors.request.use() is used to intercept the request before it is sent
// to the server. We can use this to add a token to the request header if the user is logged in
// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('profile')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//   }

//   return req;
// });

// export const fetchPosts = () => API.get('/posts');
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
export const getAllPosts = (query: string) => API.get(`/api/v1/blogs?${query}`);

export const getLatestPosts = (url: string) => API.get(url);

export const getFilteredPosts = (url: string) => API.get(url);

//https://stackoverflow.com/questions/9870523/what-are-the-differences-between-application-json-and-application-x-www-form-url
//https://dev.to/bcanseco/request-body-encoding-json-x-www-form-urlencoded-ad9
export const createPost = (newPost: BlogPost, token: string) =>
  API.post("/api/v1/blogs", newPost, {
    headers: {
      // set content type to json
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

// Note: In this case url = 'api/v1/blogs/slug/${slug}'
export const getSpecificPost = (url: string, slug: string) => API.get(url + slug);
export const fetchPost = (slug: string) => API.get(`api/v1/blogs/slug/${slug}`);

export const updatePost = (
  id: string,
  updatedPost: BlogPost,
  config: AxiosRequestConfig
) => API.patch(`/api/v1/blogs/${id}`, updatedPost, config);

export const deletePost = (id: string, config: AxiosRequestConfig) =>
  API.delete(`/api/v1/blogs/${id}`, config);

// ------------------ AUTH ------------------  //
export const signUp = (formData: SignUpFormData) =>
  API.post("/api/v1/users/signup", formData);
export const confirmSignup = (token: string) =>
  API.post(`/api/v1/users/confirmSignup/${token}`);

export const signIn = (formData: SignInFormData) =>
  API.post("/api/v1/users/login", formData);

export const forgotPassword = (email: string) =>
  API.post("/api/v1/users/forgotPassword", email);

export const resetPassword = (
  token: string,
  password: string,
  passwordConfirm: string
) =>
  API.patch(`/api/v1/users/resetPassword/${token}`, {
    password,
    passwordConfirm,
  });

// ------------------ USER ------------------  //
export const getProfile = (url: string, token: string) =>
  API.get(url, { headers: { Authorization: `Bearer ${token}` } });

export const getEditProfile = (url: string, token: string) =>
  API.get(url, { headers: { Authorization: `Bearer ${token}` } });

export const updateProfile = (updatedProfile: any, token: string) =>
  API.patch("/api/v1/users/editProfile", updatedProfile, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ------------------ IMAGE ------------------  //
export const uploadImage = (formData: FormData) =>
  API2.post("/imagev2api/profile-upload-single", formData);

export const deleteImage = (query: string) =>
  API2.delete(`/delete-file?${query}`);
