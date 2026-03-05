import axios from "axios";

const BASE_URL = "/api/category";

const categoriesApi = {};

categoriesApi.getAllCategories = () => axios.get(`${BASE_URL}`);
categoriesApi.getCategoryById = (id) => axios.get(`${BASE_URL}/${id}`);

categoriesApi.createCategoryApi = (payload) =>
  axios.post(`${BASE_URL}`, payload);

categoriesApi.updateCategoryApi = ({ id, ...rest }) =>
  axios.patch(`${BASE_URL}/${id}`, rest);

categoriesApi.uploadMediaApi = (payload) =>
  axios.post(`${BASE_URL}/media/${payload?.id}`, payload.data);

categoriesApi.deleteMediaApi = (payload) =>
  axios.delete(`${BASE_URL}/media/${payload?.id}`);

categoriesApi.syncCategories = () => axios.post(`${BASE_URL}/sync`);

categoriesApi.getAllCategoriesByStepsApi = () => axios.get(`${BASE_URL}/steps`);

categoriesApi.addCategoriesToMapperApi = (payload) =>
  axios.post(`${BASE_URL}/add-category`, payload);

categoriesApi.getCategoryoMapperApi = (payload) =>
  axios.get(`${BASE_URL}/mapper/${payload}`);

export default categoriesApi;
