import axios from "axios";

const BASE_URL = "/api/master";

const authenticationApi = {};

authenticationApi.forgotPasswordApi = (payload) =>
  axios.post(`${BASE_URL}/forgot-password`, { email: payload?.email });

authenticationApi.verificationApi = (payload) =>
  axios.post(`${BASE_URL}/verification`, payload);

authenticationApi.loginApi = (payload) =>
  axios.post(`${BASE_URL}/login`, payload);

authenticationApi.setPasswordApi = (payload) =>
  axios.post(`${BASE_URL}/set-password`, payload);

export default authenticationApi;
