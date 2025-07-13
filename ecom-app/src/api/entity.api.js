import axios from "axios";

const BASE_URL = "/api/entity";

const entityApi = {};

entityApi.getAll = () => axios.get(`${BASE_URL}`);

entityApi.getById = ({ entityId }) => axios.get(`${BASE_URL}/${entityId}`);

entityApi.getByLocationId = ({ locationId }) =>
  axios.get(`${BASE_URL}/${locationId}`);

entityApi.create = () => axios.post(`${BASE_URL}`);

entityApi.update = ({ entityId }) => axios.put(`${BASE_URL}/${entityId}`);

entityApi.delete = ({ entityId }) => axios.delete(`${BASE_URL}/${entityId}`);

export default entityApi;
