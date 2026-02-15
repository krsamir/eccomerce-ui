import { Loader } from "@ecom/ui";
import { Button, IconButton } from "@mui/material";
import React, { lazy, Suspense } from "react";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import SyncIcon from "@mui/icons-material/Sync";
import { useNavigate } from "react-router";
import CONSTANTS from "@ecom/ui/constants";
import { useGlobalContext } from "@store";
import { useCategories } from "@hooks";

const CategoriesGrid = lazy(() => import("./Categories.grid"));

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

function Categories() {
  const navigate = useNavigate();

  const { sync } = useCategories({});

  const handleNavigation = (id) => {
    if (id)
      return navigate(
        `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.CATEGORIES}/create?id=${id}`,
      );
    return navigate(
      `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.CATEGORIES}/create`,
    );
  };
  const { state } = useGlobalContext();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Container>
          <Button variant="contained" onClick={() => handleNavigation()}>
            <AddIcon />
            Create
          </Button>
          <Button variant="contained" onClick={() => sync()}>
            <SyncIcon />
            Sync
          </Button>
        </Container>
        <CategoriesGrid
          data={state.categories}
          handleNavigation={handleNavigation}
        />
      </Suspense>
    </>
  );
}

export default Categories;
