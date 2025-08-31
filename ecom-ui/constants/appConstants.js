import ROUTES from "./routeConstants.js";

export const APP_CONSTANTS = Object.freeze({
  SUPER_ADMIN: {
    SIDEBAR: [
      {
        id: "ebb6df4a-ce4a-481d-be18-72eaab290ebf",
        name: "Location",
        route: `${ROUTES.ADMINISTRATION}/${ROUTES.SUPER_ADMIN.MAIN}/${ROUTES.SUPER_ADMIN.LOCATION}`,
      },
      {
        id: "1058df14-d076-405f-a63c-fea410942604",
        name: "Master",
        route: `${ROUTES.ADMINISTRATION}/${ROUTES.SUPER_ADMIN.MAIN}/${ROUTES.SUPER_ADMIN.MASTER}`,
      },
    ],
  },
  QUERY_KEYS: {
    GET_LOCATION_QUERY: "GET_LOCATION_QUERY",
    GET_ALL_MASTER: "GET_ALL_MASTER",
    GET_USER_BY_ID: "GET_USER_BY_ID",
    GET_ALL_ROLES: "GET_ALL_ROLES",
    GET_ALL_ENTITIES_LIST: "GET_ALL_ENTITIES_LIST",
    GET_LOGGED_IN_USER: "GET_LOGGED_IN_USER",
    GET_ENTITY_BY_ID: "GET_ENTITY_BY_ID",
  },
  GLOBAL_STORE: {
    SET_ROLES: "SET_ROLES",
    SET_ENTITIES: "SET_ENTITIES",
    SET_LOGGEDIN_USER: "SET_LOGGEDIN_USER",
  },
});
