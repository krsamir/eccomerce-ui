import React from "react";
import { Outlet } from "react-router";
import NavBar from "../NavBar";

function Home() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Home;
