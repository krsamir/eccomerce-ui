import React, { useEffect } from "react";
import styled from "@emotion/styled";
import MainAttributes from "./attributes/MainAttributes";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

function ProductCreate() {
  const form = useForm({
    defaultValues: {
      barcode: "",
      description: "",
      hsnId: "",
      id: null,
      isActive: false,
      isDeleted: true,
      name: "",
      unit: "",
      unitType: "",
      uuid: "",
      hindiName: "",
    },
  });
  const onSubmit = (data) => console.log(data);
  const { handleSubmit } = form;

  const initialConfig = {
    namespace: "MyEditor",
    theme: {},
    onError: (error) => console.error(error),
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MainContainer>
          <Button variant="contained" onClick={() => handleSubmit(onSubmit)()}>
            SAVE
          </Button>
          <MainAttributes form={form} />
        </MainContainer>
      </form>
    </div>
  );
}

const MainContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

export default ProductCreate;
