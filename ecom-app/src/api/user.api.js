import axios from "axios";

const BASE_URL = "/api/user";

const userApi = {};

userApi.registerUser = (data) => axios.post(`${BASE_URL}/create`, data);
userApi.confirmAccountApi = (data) => axios.post(`${BASE_URL}/confirm`, data);
userApi.setPasswordApi = (data) => axios.post(`${BASE_URL}/set-password`, data);
userApi.loginApi = (data) => axios.post(`${BASE_URL}/login`, data);
userApi.forgotPasswordApi = (data) =>
  axios.post(`${BASE_URL}/reset`, { email: data.email });

userApi.getLoggedInUser = (data) => axios.get(`${BASE_URL}/me`);

export default userApi;
