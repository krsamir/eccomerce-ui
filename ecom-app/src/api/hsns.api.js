import axios from "axios";

const BASE_URL = "/api/product/hsn";

const hsnsApi = {};

let controller = null;

hsnsApi.getHsnsByNameAndCode = (query) => {
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();
  return axios.get(`${BASE_URL}?name=${query}`, { signal: controller.signal });
};

export default hsnsApi;
