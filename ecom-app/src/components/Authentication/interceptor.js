import axios from "axios";
import { toast } from "react-hot-toast";
import CONSTANTS from "@ecom/ui/constants";
axios.defaults.timeout = 0.5 * 60 * 1000;

const storage = window.localStorage;
const setupAxiosInterceptors = () => {
  const onRequestSuccess = (config) => {
    const token = storage.getItem(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response) => {
    if (response?.data?.status === CONSTANTS.STATUS.SUCCESS) {
      (response?.data?.message ?? "").length &&
        toast.success(response?.data?.message);
    } else if (response?.data?.status === CONSTANTS.STATUS.FAILURE) {
      (response?.data?.message ?? "").length &&
        toast.error(response?.data?.message);
    }
    return response;
  };
  const onResponseError = (err) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
      (err?.config?.url !== "/auth/login" ||
        err?.config?.url !== "/auth/register") &&
        toast.error("Please Login Again.", { duration: 3000 });
      if (storage.getItem(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN)) {
        storage.removeItem(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
        storage.removeItem(CONSTANTS.STORAGE_KEYS.ROLE);
        window.location.reload();
      }
    } else if (err?.response?.status === 400) {
      toast.error("Insufficient/Invalid data provided");
    } else if (err.code !== "ERR_CANCELED") {
      toast.error("Getting some issue while performing the action.");
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
