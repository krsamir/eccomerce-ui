import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import MainAttributes from "./attributes/MainAttributes";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import CostAttribute from "./attributes/CostAttribute";
import StockAttributes from "./attributes/StockAttributes";

function ProductCreate() {
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm({
    defaultValues: {
      barcode: "",
      description: "",
      hsnId: "",
      id: "",
      isActive: false,
      isDeleted: true,
      name: "",
      unit: "",
      unitType: "",
      uuid: "",
      hindiName: "",
      costs: [
        {
          min_qty: "",
          max_qty: "",
          purchase_cost: "",
          cost_for_sell: "",
          actual_cost: "",
          currency: "INR",
          valid_from: "",
          valid_to: "",
          costId: "",
        },
      ],
      stock: {
        quantity_available: "",
        reorder_level: "",
        supplier_name: null,
        source: null,
      },
    },
  });

  const costsForm = useFieldArray({
    control: form.control,
    name: "costs",
  });

  const onSubmit = (data) => console.log(data);
  const { handleSubmit } = form;

  // async function hashString(payload) {
  //   const encoder = new TextEncoder();
  //   const data = encoder.encode(payload);
  //   const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  //   const hashArray = Array.from(new Uint8Array(hashBuffer));
  //   const hashHex = hashArray
  //     .map((b) => b.toString(16).padStart(2, "0"))
  //     .join("");
  //   return hashHex;
  // }

  // useEffect(() => {
  //   return () => {};
  // }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MainContainer>
          <Button
            variant="contained"
            onClick={() => handleSubmit(onSubmit)()}
            disabled={isDisabled}
          >
            SAVE
          </Button>
          <MainAttributes form={form} />
          <CostAttribute form={form} costsForm={costsForm} />
          <StockAttributes form={form} />
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
