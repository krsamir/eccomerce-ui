import axios from "axios";

const BASE_URL = "/api/master";

const masterApi = {};

masterApi.getAllUserData = () => axios.get(`${BASE_URL}`);

masterApi.getUserByIdApi = (id) => axios.get(`${BASE_URL}/user-id/${id}`);
masterApi.getAllRoles = (id) => axios.get(`${BASE_URL}/roles`);

export default masterApi;
