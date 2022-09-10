import axios from 'axios';
import { SignInFormData, SignUpFormData } from '../types';

// axio.create() returns an instance of axios with a custom config
const API = axios.create({ baseURL: 'http://localhost:5000' });

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

// export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData: SignUpFormData) => API.post('/api/v1/users/signup', formData);
export const confirmSignup = (token: string) => API.post(`/api/v1/users/confirmSignup/${token}`);

export const signIn = (formData: SignInFormData) => API.post('/api/v1/users/login', formData);

export const forgotPassword = (email: string) => API.post('/api/v1/users/forgotPassword', email);