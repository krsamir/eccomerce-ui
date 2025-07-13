import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useEffect, useState } from "react";
import { useEntity } from "@hooks";
import { Button, Modal } from "@mui/material";
import EntityForm from "./Form";

const convertToEntityRowData = (data) => {
  return {
    Name: data.name,
    GST: data.gst,
    Address: data.address,
    Location: data.location,
    Active: data.is_active,
    Deleted: data.is_deleted,
    "Proprietor Name": data.proprietor_name,
    "Max Admin": data.max_admin,
    "Max Manager": data.max_manager,
    Categories: data.categories,
    "Created By": data.created_by,
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

ModuleRegistry.registerModules([AllCommunityModule]);

function Entity() {
  const { entityList } = useEntity();
  const [rowData, setRowData] = useState([]);
  const [open, setOpen] = useState(false);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState([
    { field: "Name" },
    { field: "GST" },
    { field: "Address" },
    { field: "Location" },
    { field: "Active" },
    { field: "Deleted" },
    { field: "Proprietor Name" },
    { field: "Max Admin" },
    { field: "Max Manager" },
    { field: "Categories" },
    { field: "Created At" },
    { field: "Updated At" },
    { field: "Created By" },
  ]);

  useEffect(() => {
    setRowData(entityList?.data?.map((data) => convertToEntityRowData(data)));
  }, [entityList]);

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <EntityForm type="create" />
      </Modal>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Create Entity
      </Button>
      <div style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </>
  );
}

export default Entity;
