import React from "react";
import { Button as MuiButton } from "@mui/material";
function Button({ children }) {
  return (
    <div>
      <MuiButton variant="contained">{children}</MuiButton>
    </div>
  );
}

export default Button;
