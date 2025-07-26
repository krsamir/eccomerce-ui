import axios from "axios";

const BASE_URL = "/api/entity";

const entitiesApi = {};

entitiesApi.getAllEntitiesApi = () => axios.get(BASE_URL);
entitiesApi.getEntityByIdApi = (id) => axios.get(`${BASE_URL}/${id}`);

export default entitiesApi;
