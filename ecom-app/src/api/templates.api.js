import axios from "axios";

const BASE_URL = "/api/product/templates";

const templatesApi = {};

templatesApi.getAllTemplates = () => {
  return axios.get(`${BASE_URL}`);
};

export default templatesApi;
