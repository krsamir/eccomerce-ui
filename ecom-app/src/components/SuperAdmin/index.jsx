import { useMaster } from "@hooks";
import React from "react";
import { Outlet } from "react-router";

function SuperAdmin() {
  useMaster({ enabled: false, id: false, rolesEnabled: true });

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default SuperAdmin;
