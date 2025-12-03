import axios from "axios";

const BASE_URL = "/api/product";

const productsApi = {};

productsApi.getStockMetaData = () => axios.get(`${BASE_URL}/stocks-metadata`);

productsApi.createProduct = (payload) => axios.post(`${BASE_URL}`, payload);
productsApi.getProductByIdApi = (id) => axios.get(`${BASE_URL}?id=${id}`);

export default productsApi;
