import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import MainAttributes from "./attributes/MainAttributes";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import CostAttribute from "./attributes/CostAttribute";
import StockAttributes from "./attributes/StockAttributes";
import { useProducts } from "@hooks";
import { getDirtyFormFields } from "@ecom/ui/utils";
import { useSearchParams } from "react-router";

function ProductCreate() {
  const [isDisabled, setIsDisabled] = useState(false);

  const [searchParams] = useSearchParams();

  const productId = searchParams.get("id");

  const {
    createProduct,
    isProductCreationPending,
    getProductById,
    lastOptionsHsn,
    setLastOptionsHsn,
  } = useProducts({
    fetchStockMetaData: false,
  });

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
          minQty: "",
          maxQty: "",
          purchaseCost: "",
          costForSell: "",
          actualCost: "",
          currency: "INR",
          validFrom: "",
          validTo: "",
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

  useEffect(() => {
    if (productId) {
      getProductById(productId, form.setValue);
    }
    return () => {};
  }, [productId]);

  const onSubmit = async (data) => {
    const payload = getDirtyFormFields(data, form.formState.dirtyFields);
    console.log("🚀 ~ onSubmit ~ payload:", payload);
    if (payload?.id) {
    } else {
      try {
        console.info(payload);
        const { data } = await createProduct({
          ...payload,
          id: undefined,
          uuid: undefined,
          costs: payload.costs.map((val) => ({
            ...val,
            costId: undefined,
            currency: "INR",
          })),
        });
        form.reset({}, { keepValues: false });
        console.log("🚀 ~ onSubmit ~ data:", data?.data);
      } catch (error) {
        // console.log("🚀 ~ onSubmit ~ error:", error?.response?.data);
        console.info(error?.response?.data?.validation?.body);
        console.info(error?.response?.data?.validation?.body?.message);
      }
    }
  };

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
            disabled={isDisabled || isProductCreationPending}
          >
            SAVE
          </Button>
          <BottomComponent>
            <MainAttributes
              form={form}
              lastOptions={lastOptionsHsn}
              setLastOptions={setLastOptionsHsn}
            />
            <CostAttribute form={form} costsForm={costsForm} />
            <StockAttributes form={form} />
          </BottomComponent>
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

const BottomComponent = styled.div`
  margin-top: 20px;
  height: calc(100vh - 200px);
  overflow-y: auto;
  width: 100%;
`;

export default ProductCreate;
