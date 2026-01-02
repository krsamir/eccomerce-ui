import axios from "axios";

const BASE_URL = "/api/product/media";

const mediaApi = {};

mediaApi.uploadMediaApi = (payload) => axios.post(BASE_URL, payload);
mediaApi.getMediaList = (productId) =>
  axios.get(`${BASE_URL}/list/${productId}`);

export default mediaApi;
