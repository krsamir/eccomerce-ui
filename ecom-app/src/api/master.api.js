import axios from "axios";

const BASE_URL = "/api/master";

const masterApi = {};

masterApi.getAllUserData = () => axios.get(`${BASE_URL}`);

masterApi.getUserByIdApi = (id) => axios.get(`${BASE_URL}/user-id/${id}`);
masterApi.getAllRoles = () => axios.get(`${BASE_URL}/roles`);
masterApi.checkIfUserExistsApi = (payload) =>
  axios.post(`${BASE_URL}/check-if-exists`, payload);

let createMasterController = null;
masterApi.createMasterUser = (payload) => {
  if (createMasterController) {
    createMasterController.abort();
  }
  createMasterController = new AbortController();
  const data = {
    userName: payload?.userName,
    email: payload?.email,
    firstName: payload?.firstName,
    lastName: payload?.lastName,
    mobile: payload?.mobile,
    roles: payload?.roles,
    isActive: payload?.isActive,
    isDeleted: payload?.isDeleted,
    entityId: payload?.entityId,
  };
  return axios.post(`${BASE_URL}`, data, {
    signal: createMasterController?.signal,
  });
};

let updateMasterController = null;
masterApi.updateMasterUser = (payload) => {
  if (updateMasterController) {
    updateMasterController.abort();
  }
  updateMasterController = new AbortController();
  return axios.patch(`${BASE_URL}`, payload, {
    signal: updateMasterController?.signal,
  });
};

masterApi.getLoggedInUser = () => axios.get(`${BASE_URL}/me`);

export default masterApi;
