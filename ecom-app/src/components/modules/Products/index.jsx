import CONSTANTS from "@ecom/ui/constants";
import { Button } from "@mui/material";
import { getRole } from "@utils";
import React, { useMemo } from "react";
import { useNavigate } from "react-router";
const map = new Map();

map.set(
  CONSTANTS.ROLES_NAME.SUPER_ADMIN,
  CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN
);
map.set(CONSTANTS.ROLES_NAME.ADMIN, CONSTANTS.ROUTE_PATHS.ADMIN.MAIN);

function Products() {
  const storage = window?.localStorage;

  const navigate = useNavigate();
  const roleKey = storage.getItem(CONSTANTS.STORAGE_KEYS.ROLE);

  const path = useMemo(
    () =>
      `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${map.get(getRole(roleKey))}/${
        CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.PRODUCT
      }/create?id=13dcec48-56a0-4cde-8adf-29b245a4c0a9`,
    []
  );

  return (
    <div>
      <Button variant="contained" onClick={() => navigate(path)}>
        Create
      </Button>
    </div>
  );
}

export default Products;
