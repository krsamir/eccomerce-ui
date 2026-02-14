import React, { useMemo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeAlpine,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import propTypes from "prop-types";
import { convertISOToLocal } from "@utils";
import styled from "@emotion/styled";
import { useNavigate } from "react-router";
import CONSTANTS from "@ecom/ui/constants";

ModuleRegistry.registerModules([AllCommunityModule]);

const theme = themeAlpine.withParams({
  fontFamily: "Roboto",
  fontSize: "15px",
});

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CellRendererComponent = ({ data, navigate }) => {
  const handleNavigation = (id) => {
    return navigate(
      `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.CATEGORIES}/create?id=${id}`,
    );
  };
  return (
    <Container>
      <EditIcon
        sx={{ cursor: "pointer", marginTop: "5px" }}
        onClick={() => handleNavigation(data?.id)}
      />
    </Container>
  );
};

function CategoriesGrid({ data }) {
  const navigate = useNavigate();
  const colDefs = useMemo(
    () => [
      {
        field: "",
        headerName: "Action",
        cellRenderer: CellRendererComponent,
        /**
         * send navigate object as param since initializing in
         * cell renderer this will lead to multiple initialization of navigate object
         */
        cellRendererParams: {
          navigate,
        },
        width: 150,
      },
      { field: "id", headerName: "ID" },
      { field: "name" },
      {
        field: "media",
        valueGetter: (params) =>
          !!params.data.mediaId ? "AVLBL" : "NOT AVLBL",
      },
      { field: "parentId" },
      { field: "rank" },
      { field: "isFavourite" },
      { field: "isActive", headerName: "isActive" },
      {
        field: "createdAt",
        valueGetter: ({ data }) => convertISOToLocal(data?.createdAt),
      },
      {
        field: "updatedAt",
        valueGetter: ({ data }) => convertISOToLocal(data?.updatedAt),
      },
    ],
    [navigate],
  );

  const gridOptions = useMemo(
    () => ({
      enableCellTextSelection: true,
      // rowSelection: { copySelectedRows: true, mode: "singleRow" },
      onGridReady: () => {},
      pagination: true,
    }),
    [],
  );
  return (
    <>
      <div style={{ height: 600 }}>
        <AgGridReact
          theme={theme}
          rowData={data}
          columnDefs={colDefs}
          gridOptions={gridOptions}
        />
      </div>
    </>
  );
}

CategoriesGrid.propTypes = {
  masterData: propTypes.object,
};
export default CategoriesGrid;
