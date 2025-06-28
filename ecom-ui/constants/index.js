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
const ROLE_BY_NAME_MAP = new Map();
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

ROLES.map(({ id, name }) => {
  ROLE_BY_NAME_MAP.set(name, id);
});

const ROLES_NAME = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  DELIVERY_PARTNER: "DELIVERY_PARTNER",
};

const CONSTANTS = Object.freeze({
  ...CONSTANTS_VAL,
  ROLES,
  ROLE_MAP,
  APP_CONSTANTS,
  ROLE_BY_NAME_MAP,
  ROLES_NAME,
});

export default CONSTANTS;
