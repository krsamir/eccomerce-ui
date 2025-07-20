import { Loader } from "@ecom/ui";
import { Button, IconButton } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { useMaster } from "@hooks";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import CONSTANTS from "@ecom/ui/constants";

const MasterGrid = lazy(() => import("./Master.grid"));

const Container = styled.div`
  margin-bottom: 20px;
`;

function Master() {
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    if (id)
      return navigate(
        `/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MASTER}/create?id=${id}`
      );
    return navigate(
      `/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MASTER}/create`
    );
  };

  const { masterData } = useMaster({ enabled: true });

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Container>
          <Button variant="contained" onClick={() => handleNavigation()}>
            <AddIcon />
            Create
          </Button>
        </Container>
        <MasterGrid data={masterData} handleNavigation={handleNavigation} />
      </Suspense>
    </>
  );
}

export default Master;
