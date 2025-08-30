import axios from "axios";

const BASE_URL = "/api/user";

const userApi = {};

userApi.getLoggedInUser = () => axios.get(`${BASE_URL}`);

export default userApi;
