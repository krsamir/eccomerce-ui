import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import MainAttributes from "./attributes/MainAttributes";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import CostAttribute from "./attributes/CostAttribute";
import StockAttributes from "./attributes/StockAttributes";
import ImageAttributes from "./attributes/ImageAttributes";
import { useProducts } from "@hooks";
import { getDirtyFormFields, transformToHashString } from "@ecom/ui/utils";
import { useNavigate, useSearchParams } from "react-router";
import CONSTANTS from "@ecom/ui/constants";
import { getRole, getStatusColor } from "@utils";
import SyncIcon from "@mui/icons-material/Sync";
import toast from "react-hot-toast";
import Categories from "./attributes/Categories";

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
    publishedProduct,
    product,
    publishProduct,
    refetch
  } = useProducts({
    fetchStockMetaData: false,
    fetchPublishStatus: true,
    productId,
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
            setTimeout(async () => {
              await getProductById(productId, form);
            }, 500);
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
        if (data?.status === CONSTANTS.STATUS.SUCCESS) {
          form.reset({}, { keepValues: false });
          navigate(
            `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${map.get(
              getRole(roleKey)
            )}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.PRODUCT}/create?id=${
              data?.data?.uuid
            }`
          );
        }
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
      }
    }
  };

  const { handleSubmit } = form;

  const handleRefresh = async () => {
    if (productId) {
      getProductById(productId, form);
      refetch()
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MainContainer>
          <Container>
            <LeftContainer>
              {!!product && (
                <StatusContainer>
                  <PublishStatus>PUBLISH STATUS: </PublishStatus>
                  <StatusColor $color={getStatusColor(product?.status)} />
                  <StatusText>{product?.status}</StatusText>
                  {!!publishedProduct && (
                    <StatusText className="small">
                      {new Date(publishedProduct?.updatedAt).toLocaleString()}
                    </StatusText>
                  )}
                </StatusContainer>
              )}
              {!!product && !!publishedProduct && (
                <StatusContainer>
                  <PublishStatus>SYNC STATUS: </PublishStatus>
                  <StatusText>
                    {publishedProduct?.masterHash === product.masterHash
                      ? "SYNCED"
                      : "NOT SYNCED"}
                  </StatusText>
                </StatusContainer>
              )}
            </LeftContainer>
            <FlexContainer>
              <Button
                variant="contained"
                disabled={!form.watch("id")}
                onClick={handleRefresh}
              >
                <SyncIcon />
                Refetch
              </Button>
              <Button
                variant="contained"
                disabled={!form.watch("id")}
                onClick={() => publishProduct(form.watch("id"))}
              >
                Publish
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSubmit(onSubmit)()}
                disabled={isDisabled || isProductCreationPending}
              >
                SAVE
              </Button>
            </FlexContainer>
          </Container>

          <BottomComponent>
            <MainAttributes
              form={form}
              lastOptions={lastOptionsHsn}
              setLastOptions={setLastOptionsHsn}
            />
            <CostAttribute form={form} costsForm={costsForm} />
            <StockAttributes form={form} />
            <ImageAttributes form={form} />
            <Categories form={form}/>
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
`;

const BottomComponent = styled.div`
  margin-top: 20px;
  height: calc(100vh - 200px);
  overflow-y: auto;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LeftContainer = styled.div`
  flex: 1;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const PublishStatus = styled.div`
  font-weight: 700;
  margin-right: 5px;
`;
const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const StatusColor = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${({ $color }) => $color};
  border-radius: 50%;
  margin-right: 5px;
`;
const StatusText = styled.div`
  margin-right: 5px;
  &.small {
    font-size: 10px;
  }
`;

export default ProductCreate;
