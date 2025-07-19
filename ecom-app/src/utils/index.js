import CONSTANTS from "@ecom/ui/constants";

export const getRole = () => {
  const storage = window?.localStorage;
  const roleKey = storage.getItem(CONSTANTS.STORAGE_KEYS.ROLE);
  return CONSTANTS.ROLE_MAP.get(roleKey) ?? "";
};

export const getRoleById = (id) => {
  return CONSTANTS.ROLE_BY_NAME_MAP.get(id);
};

export const convertISOToLocal = (data) => new Date(data)?.toLocaleString();
