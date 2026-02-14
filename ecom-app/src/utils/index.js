import CONSTANTS from "@ecom/ui/constants";
export { getConfig, getStatusColor } from "./helper";

export const getRole = () => {
  const storage = window?.localStorage;
  const roleKey = storage.getItem(CONSTANTS.STORAGE_KEYS.ROLE);
  return CONSTANTS.ROLE_MAP.get(roleKey) ?? "";
};

export const getRoleById = (id) => {
  return CONSTANTS.ROLE_BY_NAME_MAP.get(id);
};

const pad = (payload) => String(payload).padStart(2, "0");

export const convertISOToLocal = (data) => {
  const date = new Date(data);
  if (data) {
    return `${pad(date?.getDate())}/${pad(date?.getMonth() + 1)}/${pad(date?.getFullYear())} ${pad(date?.getHours())}:${pad(date?.getMinutes())}:${pad(date?.getSeconds())}`;
  }
  return "";
};
