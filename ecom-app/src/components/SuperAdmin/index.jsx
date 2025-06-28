import React from "react";
import { Outlet } from "react-router";

function SuperAdmin() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default SuperAdmin;
