import React from "react";
import { Button as MuiButton } from "@mui/material";
function Button({ children, ...props }) {
  return (
    <div>
      <MuiButton variant="contained" {...props}>
        {children}
      </MuiButton>
    </div>
  );
}

export default Button;
