import { Button } from "@mui/material";
import React from "react";

function Home() {
  const handleLogout = () => {
    window?.localStorage?.clear();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <div>
      <Button variant="contained" onClick={() => handleLogout()}>
        Logout
      </Button>
    </div>
  );
}

export default Home;
