import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { productsApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useEffect, useMemo, useState } from "react";

const useProducts = ({ fetchStockMetaData = false }) => {
  const [metaData, setMetaData] = useState({
    source: [],
    supplierName: [],
  });

  const [lastOptionsHsn, setLastOptionsHsn] = useState([]);

  const { data: { data: { data: meta = [] } = {} } = {}, isLoadingMetaData } =
    useQuery({
      queryKey: [CONSTANTS.QUERY_KEYS.GET_STOCKS_METADATA],
      queryFn: productsApi.getStockMetaData,
      enabled: fetchStockMetaData,
    });

  useEffect(() => {
    if (meta?.length > 0) {
      const [arr] = meta.map(({ source, supplierName }) => [
        [source],
        [supplierName],
      ]);
      setMetaData({
        source: [...new Set(arr?.[0] ?? [])].map((val) => ({
          label: val,
          value: val,
        })),
        supplierName: [new Set(arr?.[1] ?? [])].map((val) => ({
          label: val,
          value: val,
        })),
      });
    }
    return () => {};
  }, [meta]);

  const { mutateAsync: createProduct, isPending: isProductCreationPending } =
    useMutation({
      mutationFn: productsApi.createProduct,
    });

  const queryClient = useQueryClient();

  const getProductById = async (id, setValue) => {
    if (!setValue) {
      console.info("setValue not available");
    }

    try {
      const { data } = await queryClient.fetchQuery({
        queryKey: [CONSTANTS.QUERY_KEYS.GET_PRODUCT_BY_ID, id],
        queryFn: () => productsApi.getProductByIdApi(id),
      });
      const value = data?.data;
      console.log("🚀 ~ getProductById ~ value:", value);
      if (value?.hsn?.id) {
        setLastOptionsHsn([
          {
            label: `${value.hsn.hsnCode} - ${value.hsn.hsnDescription}`,
            value: value.hsn.id,
          },
        ]);
      }
      if (value) {
        setValue("barcode", value?.barcode);
        setValue("description", value?.description);
        setValue("hsnId", value?.hsnId);
        setValue("id", value?.id);
        setValue("isActive", value?.isActive);
        setValue("isDeleted", value?.isDeleted);
        setValue("name", value?.name);
        setValue("unit", value?.unit);
        setValue("unitType", value?.unitType);
        setValue("uuid", value?.uuid);
        setValue("hindiName", value?.hindiName);
        setValue("costs", value?.costs);
        setValue("stock", value?.stock);
        setValue("stock.quantity_available", value?.stock?.quantityAvailable);
        setValue("stock.reorder_level", value?.stock?.reorderLevel);
        setValue("stock.supplier_name", value?.stock?.supplierName);
        setValue("stock.source", value?.stock?.source);
      }
    } catch (error) {
      console.log("🚀 ~ getProductById ~ error:", error);
    }
  };

  return useMemo(
    () => ({
      metaData,
      isLoadingMetaData,
      createProduct,
      isProductCreationPending,
      getProductById,
      lastOptionsHsn,
      setLastOptionsHsn,
    }),
    [
      metaData,
      isLoadingMetaData,
      createProduct,
      isProductCreationPending,
      getProductById,
      lastOptionsHsn,
      setLastOptionsHsn,
    ]
  );
};

export default useProducts;

//       costs: [
//         {
//           min_qty: "",
//           max_qty: "",
//           purchase_cost: "",
//           cost_for_sell: "",
//           actual_cost: "",
//           currency: "INR",
//           valid_from: "",
//           valid_to: "",
//           costId: "",
//         },
//       ],
//       stock: {
//         quantity_available: "",
//         reorder_level: "",
//         supplier_name: null,
//         source: null,
//       },
