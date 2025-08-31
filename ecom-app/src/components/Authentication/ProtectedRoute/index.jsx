import { Navigate, useLocation } from "react-router";
import React from "react";
import CONSTANTS from "@ecom/ui/constants";
const { ROLES, STORAGE_KEYS } = CONSTANTS;
const storage = window.localStorage;
import propTypes from "prop-types";

function ProtectedRoute({ children, hasAuthority = [], ...rest }) {
  if (typeof hasAuthority !== typeof []) {
    console.error("Please pass an array of Roles e.x. [ADMIN, USER]");
    hasAuthority = [];
  } else {
    if (hasAuthority.length === 0) {
      hasAuthority = ROLES.map(({ id }) => id);
    }
  }
  const role = storage.getItem(STORAGE_KEYS.ROLE);

  const isAuthenticated =
    storage.getItem(STORAGE_KEYS.ACCESS_TOKEN) !== undefined &&
    storage.getItem(STORAGE_KEYS.ACCESS_TOKEN) !== null &&
    storage.getItem(STORAGE_KEYS.ACCESS_TOKEN) !== "" &&
    hasAuthority.includes(role);
  !isAuthenticated && console.warn("AUTHENTICATION ERROR");

  const location = useLocation();
  if (!children) {
    throw new Error(
      `A component needs to be specified for private route for path ${JSON.stringify(
        rest
      )}`
    );
  }
  if (isAuthenticated) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  storage.clear();
  return (
    <Navigate
      to={{
        pathname: `${CONSTANTS.ROUTE_PATHS.LOGIN}`,
        search: location.search,
      }}
      replace
      state={{ from: location }}
    />
  );
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  hasAuthority: propTypes.arrayOf(propTypes.string),
};
