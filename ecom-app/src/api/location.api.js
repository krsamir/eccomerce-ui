import axios from "axios";

const BASE_URL = "/api/location";

const locationApi = {};

locationApi.getLocationApi = () => axios.get(`${BASE_URL}`);

locationApi.createLocationApi = ({ name, city, state, country }) =>
  axios.post(`${BASE_URL}`, {
    name,
    city,
    state,
    country,
  });

locationApi.updateLocationApi = ({
  id,
  name,
  city,
  country,
  state,
  is_deleted,
}) =>
  axios.patch(`${BASE_URL}`, {
    id,
    name,
    city,
    state,
    country,
    delete: is_deleted,
  });

locationApi.deleteLocationApi = ({ id }) =>
  axios.delete(`${BASE_URL}?id=${id}`);

export default locationApi;
