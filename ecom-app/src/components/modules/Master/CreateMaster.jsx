import { Button, IconButton } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";

const Container = styled.div`
  margin-bottom: 20px;
`;
function CreateMaster() {
  return (
    <Container>
      <IconButton></IconButton>
      <Button variant="contained">
        {" "}
        <AddIcon />
        Create
      </Button>
    </Container>
  );
}

export default CreateMaster;
