import CONSTANTS from "@ecom/ui/constants";

export const getRole = () => {
  const storage = window?.localStorage;
  const roleKey = storage.getItem(CONSTANTS.STORAGE_KEYS.ROLE);
  return CONSTANTS.ROLE_MAP.get(roleKey) ?? "";
};
