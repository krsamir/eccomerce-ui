import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import MainAttributes from "./attributes/MainAttributes";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import CostAttribute from "./attributes/CostAttribute";
import StockAttributes from "./attributes/StockAttributes";
import { useProducts } from "@hooks";
import { getDirtyFormFields } from "@ecom/ui/utils";
import { useNavigate, useSearchParams } from "react-router";
import CONSTANTS from "@ecom/ui/constants";
import { getRole } from "@utils";
import toast from "react-hot-toast";

const map = new Map();
const storage = window?.localStorage;

map.set(
  CONSTANTS.ROLES_NAME.SUPER_ADMIN,
  CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN
);
map.set(CONSTANTS.ROLES_NAME.ADMIN, CONSTANTS.ROUTE_PATHS.ADMIN.MAIN);
const roleKey = storage.getItem(CONSTANTS.STORAGE_KEYS.ROLE);

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
    updateProduct,
  } = useProducts({
    fetchStockMetaData: false,
  });

  const navigate = useNavigate();

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
        quantityAvailable: "",
        reorderLevel: "",
        supplierName: "",
        source: "",
      },
    },
  });

  const costsForm = useFieldArray({
    control: form.control,
    name: "costs",
  });

  useEffect(() => {
    if (productId) {
      getProductById(productId, form);
    }
    return () => {};
  }, [productId]);

  const onSubmit = async (data) => {
    const payload = getDirtyFormFields(data, form.formState.dirtyFields);

    if (data?.id) {
      let costs = payload?.costs;
      let stock,
        hsnId = undefined;

      if (
        payload?.hsnId === "object" &&
        Object.keys(payload?.hsnId ?? {})?.length
      ) {
        hsnId = undefined;
      }
      if (Object.keys(payload ?? {}).length > 0) {
        if (payload?.costs?.length > 0) {
          costs = (payload?.costs ?? [])
            ?.map((value, i) => {
              if (value) {
                const val = Object.fromEntries(
                  Object.entries(value ?? {}).map(([key, value]) => [
                    key,
                    value?.length === 0 ? undefined : value,
                  ])
                );
                return { ...val, id: data.costs[i].costId, currency: "INR" };
              }
            })
            .filter(Boolean);
        }
        if (Object.keys(payload?.stock ?? {})?.length) {
          stock = {
            ...payload?.stock,
            source: payload?.stock?.source?.value ?? undefined,
            supplierName: payload?.stock?.supplierName?.value ?? undefined,
          };
        }
        let stockFlag = false;

        Object.entries(stock ?? {}).map(([key, value]) => {
          if (value !== undefined) {
            stockFlag = true;
          }
        });
        if (!stockFlag) {
          stock = undefined;
        }

        const finalPayload = {
          ...payload,
          hsnId,
          costs,
          stock,
          id: data?.id,
        };
        try {
          const { data: result } = await updateProduct({ ...finalPayload });
          if (result.status === CONSTANTS.STATUS.SUCCESS) {
            form.reset({}, { keepValues: true });
            await getProductById(productId, form);
          }
        } catch (error) {
          console.log("🚀 ~ onSubmit ~ error:", error);
        }
      } else {
        toast.error("Nothing to update!");
      }
    } else {
      console.log("🚀 ~ onSubmit ~ payload:", payload);
      try {
        const { data } = await createProduct({
          ...payload,
          id: undefined,
          uuid: undefined,
          costs: (payload.costs ?? []).map((val) => ({
            ...val,
            costId: undefined,
            currency: "INR",
          })),
          stock: {
            ...payload.stock,
            source: payload?.stock?.source?.value,
            supplierName: payload?.stock?.supplierName?.value,
          },
        });
        form.reset({}, { keepValues: false });
        navigate(
          `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${map.get(
            getRole(roleKey)
          )}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.PRODUCT}/create?id=${
            data?.data?.uuid
          }`
        );
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
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
