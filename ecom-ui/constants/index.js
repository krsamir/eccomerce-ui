import ROUTES from "./routeConstants.js";
import { APP_CONSTANTS } from "./appConstants.js";

const CONSTANTS_VAL = {
  ROUTE_PATHS: ROUTES,
  STORAGE_KEYS: {
    ROLE: "identity",
    ACCESS_TOKEN: "access_token",
  },
  STATUS: {
    SUCCESS: 1,
    FAILURE: 0,
  },
};

const ROLE_MAP = new Map();
const ROLES = [
  {
    id: "91b5a4d7-4187-4864-88fa-a1f4207199df",
    name: "SUPER_ADMIN",
  },
  {
    id: "071e921d-d08f-4d7f-84a9-c00d4409d774",
    name: "ADMIN",
  },
  {
    id: "7feb7cb4-23d6-453b-b7b5-7a18c6f79b72",
    name: "MANAGER",
  },
  {
    id: "cf727bcc-4f2c-4661-ab58-a7b4b4f6e905",
    name: "DELIVERY_PARTNER",
  },
];
ROLES.map(({ id, name }) => {
  ROLE_MAP.set(id, name);
});

const storage = window?.localStorage;
const roleKey = storage.getItem(CONSTANTS_VAL.STORAGE_KEYS.ROLE);

const CONSTANTS = Object.freeze({
  ...CONSTANTS_VAL,
  ROLES,
  ROLE_MAP,
  APP_CONSTANTS,
  ROLE_NAME: (role) =>
    role ? ROLE_MAP.get(role) : ROLE_MAP.get(roleKey) ?? "",
});

export default CONSTANTS;
