import axios, { AxiosRequestConfig } from "axios";
import { BlogPost, SignInFormData, SignUpFormData } from "../types";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL });
// https://stackoverflow.com/questions/41253228/preflight-or-cors-error-on-every-request
// API.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// --------------- IMAGE UPLOAD API --------------- //
const API2 = axios.create({ baseURL: process.env.NEXT_PUBLIC_IMAGE_API_URL });
// API2.defaults.headers.post["Content-Type"] = "multipart/form-data";

// API2.interceptors.request.use((req: AxiosRequestConfig) => {
//   req.headers!.Authorization = `Bearer ${process.env.NEXT_PUBLIC_IMAGE_SERVER_KEY}`;
//   return req;
// });

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

export const getAllPosts = (query: string) => API.get(`/api/v1/blogs?${query}`);

export const getLatestPosts = (url: string) => API.get(url);

export const getRandomPosts = () => API.get("/api/v1/blogs/random");

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
export const getSpecificPost = (url: string, slug: string) =>
  API.get(url + slug);
export const fetchPost = (slug: string) => API.get(`api/v1/blogs/slug/${slug}`);

export const updatePost = (
  id: string,
  updatedPost: BlogPost,
  config: AxiosRequestConfig
) => API.patch(`/api/v1/blogs/${id}`, updatedPost, config);

export const deletePost = (id: string, config: AxiosRequestConfig) =>
  API.delete(`/api/v1/blogs/${id}`, config);

export const likePost = (id: string, config: AxiosRequestConfig) =>
  API.patch(`/api/v1/blogs/like/${id}`, {}, config);

export const fetchLikes = (url: string, config: AxiosRequestConfig) =>
  API.get(url, config);

// ------------------ AUTH ------------------  //
export const signUp = (formData: SignUpFormData) =>
  API.post("/api/v1/users/signup", formData);
export const confirmSignup = (token: string) =>
  API.post(`/api/v1/users/confirmSignup/${token}`);

export const signIn = (formData: SignInFormData) =>
  API.post("/api/v1/users/login", formData);

export const forgotPassword = (email: string) =>
  API.post("/api/v1/users/forgotPassword", {email});

export const resendSignUpToken = (email: string) => 
  API.post("/api/v1/users/resendSignupToken", {email})


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

// -------------------- ADMIN --------------------- //
export const getUnReviewedBlogs = (url: string, token: string) =>
  API.get(url, { headers: { Authorization: `Bearer ${token}` } });

export const getUnReviewedBlog = (url: string, token: string) =>
  API.get(url, { headers: { Authorization: `Bearer ${token}` } });

// ------------------ IMAGE ------------------  //
export const uploadImage = (formData: FormData, config: AxiosRequestConfig) =>
  API2.post("/imagev2api/profile-upload-single", formData, config);

export const deleteImage = (query: string, config: AxiosRequestConfig) =>
  API2.delete(`/delete-file?filePath=${query}`, config);
