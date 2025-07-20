import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@ecom/ui";
import { useLocationData } from "@hooks";
import FormDialog from "./CreateLocationForm";

ModuleRegistry.registerModules([AllCommunityModule]);

const convertToLocationRowData = (data) => {
  return {
    Name: data.name,
    City: data.city,
    State: data.state,
    Country: data.country,
    "Created At": new Date(data.created_at).toLocaleString("en-in", {
      dateStyle: "short",
      timeStyle: "short",
    }),
    "Updated At": new Date(data.updated_at).toLocaleString("en-in", {
      dateStyle: "short",
      timeStyle: "short",
    }),
  };
};

function Location() {
  const { response, isSuccess } = useLocationData();

  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState(false);
  const [colDefs] = useState([
    {
      field: "Action",
      minWidth: 100,
      maxWidth: 150,
      cellStyle: { alignContent: "center" },
      cellRenderer: () => (
        <div style={{ display: "flex", gap: "30px", justifyItems: "center" }}>
          <DeleteIcon style={{ cursor: "pointer", color: "red" }} />
          <EditIcon style={{ cursor: "pointer", color: "green" }} onClick={() => {
            setOpen(true);
          }}/>
        </div>
      ),
    },
    { field: "Name" },
    { field: "City" },
    { field: "State" },
    { field: "Country" },
    { field: "Created At" },
    { field: "Updated At" },
  ]);

  useEffect(() => {
    setRowData(
      response?.data?.data?.map((data) => convertToLocationRowData(data))
    );
  }, [response]);

  return (
    <div>
      <div style={{ margin: "20px 0 30px 10px" }}>
        <Button
          children="Create"
          onClick={() => {
            setOpen(true);
          }}
        />
        <FormDialog open={open} setOpen={setOpen} />
      </div>
      <div style={{ width: "80vw", height: "80vh" }}>
        <AgGridReact
          loading={!isSuccess}
          rowData={rowData}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
}

export default Location;
