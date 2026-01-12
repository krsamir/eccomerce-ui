import axios from "axios";

const BASE_URL = "/api/product/media";

const mediaApi = {};

mediaApi.uploadMediaApi = (payload) => axios.post(BASE_URL, payload);
mediaApi.getMediaList = (productId) =>
  axios.get(`${BASE_URL}/list/${productId}`);
mediaApi.deleteMediaApi = ({ id, productId }) =>
  axios.delete(`${BASE_URL}/${productId}/${id}`);
mediaApi.updateSequenceMediaApi = ({ payload, productId }) =>
  axios.patch(`${BASE_URL}/${productId}/order`, payload);
export default mediaApi;
