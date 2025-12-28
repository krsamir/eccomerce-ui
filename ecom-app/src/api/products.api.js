import axios from "axios";

const BASE_URL = "/api/product";

const productsApi = {};

productsApi.getStockMetaData = () => axios.get(`${BASE_URL}/stocks-metadata`);

productsApi.createProduct = (payload) => axios.post(`${BASE_URL}`, payload);

productsApi.getProductByIdApi = (id) => axios.get(`${BASE_URL}/${id}`);

productsApi.getAllProducts = (payload) => {
  const { page, filters } = payload;
  const arr = [];
  if (filters) {
    const obj = Object.entries(filters);
    obj.map(([keys, value]) => {
      if (value) {
        const [type = "", col = ""] = keys.split(".");
        arr.push({ type, col, value });
      }
    });
  }
  return axios.post(`${BASE_URL}/all?page=${page}`, {
    filter: arr,
  });
};

productsApi.getAllProductsMeta = () => axios.get(`${BASE_URL}/meta`);

productsApi.updateProduct = (payload) => axios.patch(`${BASE_URL}`, payload);

export default productsApi;
