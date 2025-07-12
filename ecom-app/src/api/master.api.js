import axios from "axios";

const BASE_URL = "/api/master";

const masterApi = {};

masterApi.getAllUserData = () => axios.get(`${BASE_URL}`);

export default masterApi;
