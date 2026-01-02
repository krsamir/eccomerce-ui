import axios from "axios";

const BASE_URL = "/api/product/media";

const mediaApi = {};

mediaApi.uploadMediaApi = (payload) => axios.post(BASE_URL, payload);
mediaApi.getMediaList = (productId) =>
  axios.get(`${BASE_URL}/list/${productId}`);
mediaApi.deleteMediaApi = (id) => axios.delete(`${BASE_URL}/${id}`);
mediaApi.updateSequenceMediaApi = ({ payload }) =>
  axios.patch(`${BASE_URL}/order`, payload);

export default mediaApi;
