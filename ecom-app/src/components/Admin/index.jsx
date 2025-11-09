import React from "react";
import { Outlet } from "react-router";

function Admin() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Admin;
