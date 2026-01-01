import axios from "axios";

const BASE_URL = "/api/product/media";

const mediaApi = {};

mediaApi.uploadMediaApi = (payload) => axios.post(BASE_URL, payload);

export default mediaApi;
