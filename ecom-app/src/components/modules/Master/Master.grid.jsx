import React, { useMemo, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeAlpine,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import propTypes from "prop-types";
import { convertISOToLocal } from "@utils";

ModuleRegistry.registerModules([AllCommunityModule]);

const theme = themeAlpine.withParams({
  fontFamily: "Roboto",
  fontSize: "15px",
});
function MasterGrid({ data }) {
  const masterdata = useMemo(() => (data ? data?.data?.data : data), [data]);
  const colDefs = useMemo(
    () => [
      { field: "id", headerName: "ID" },
      { field: "userName" },
      { field: "email" },
      { field: "firstName" },
      { field: "lastName" },
      { field: "role.name" },
      { field: "mobile" },
      {
        field: "lastLogin",
        valueGetter: ({ data }) => convertISOToLocal(data?.lastLogin),
      },
      { field: "token" },
      { field: "validTill" },
      {
        field: "isActive",
        valueGetter: ({ data }) => (data?.isActive === 1 ? "YES" : "NO"),
      },
      {
        field: "isDeleted",
        valueGetter: ({ data }) => (data?.isDeleted === 1 ? "YES" : "NO"),
      },
      { field: "invalidLogins" },
      { field: "createdBy" },
      {
        field: "createdAt",
        valueGetter: ({ data }) => convertISOToLocal(data?.createdAt),
      },
      {
        field: "updatedAt",
        valueGetter: ({ data }) => convertISOToLocal(data?.updatedAt),
      },
    ],
    []
  );

  const gridOptions = useMemo(
    () => ({
      enableCellTextSelection: true,
      // rowSelection: { copySelectedRows: true, mode: "singleRow" },
      onGridReady: (params) => {},
      pagination: true,
    }),
    []
  );
  return (
    <>
      <div style={{ height: 600 }}>
        <AgGridReact
          theme={theme}
          rowData={masterdata}
          columnDefs={colDefs}
          gridOptions={gridOptions}
        />
      </div>
    </>
  );
}

MasterGrid.propTypes = {
  masterData: propTypes.object,
};
export default MasterGrid;
