import axios from "axios";

const BASE_URL = "/api/product/units";

const unitsApi = {};

unitsApi.getAllUnits = () => {
  return axios.get(`${BASE_URL}`);
};

export default unitsApi;
