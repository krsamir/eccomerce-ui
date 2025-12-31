import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { productsApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useEffect, useMemo, useState } from "react";

const useProducts = ({ fetchStockMetaData = false, fetchProducts = false }) => {
  const [metaData, setMetaData] = useState({
    source: [],
    supplierName: [],
  });
  const [productData, setProductData] = useState({});

  const [lastOptionsHsn, setLastOptionsHsn] = useState([]);

  const sourceArr = [];
  const supplierNameArr = [];

  const { data: { data: { data: meta = [] } = {} } = {}, isLoadingMetaData } =
    useQuery({
      queryKey: [CONSTANTS.QUERY_KEYS.GET_STOCKS_METADATA],
      queryFn: productsApi.getStockMetaData,
      enabled: fetchStockMetaData,
    });

  const { mutateAsync: getAllProductAsync } = useMutation({
    mutationFn: productsApi.getAllProducts,
  });

  const { data: { data: { data: count = 0 } = {} } = {} } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_ALL_PRODUCTS_META],
    queryFn: () => productsApi.getAllProductsMeta(),
    enabled: fetchProducts,
  });

  useEffect(() => {
    if (meta?.length > 0) {
      meta.forEach(({ source, supplierName }) => {
        if (source) {
          sourceArr.push(source);
        }
        if (supplierName) {
          supplierNameArr.push(supplierName);
        }
      });

      setMetaData({
        source: [...new Set(sourceArr ?? [])].map((val) => ({
          label: val,
          value: val,
        })),
        supplierName: [...new Set(supplierNameArr ?? [])].map((val) => ({
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

  const getProductById = async (id, form) => {
    if (!(Object.keys(form)?.length > 0)) {
      console.info("form not available");
    }

    try {
      const { data } = await queryClient.fetchQuery({
        queryKey: [CONSTANTS.QUERY_KEYS.GET_PRODUCT_BY_ID, id],
        queryFn: () => productsApi.getProductByIdApi(id),
      });
      const value = data?.data;
      setProductData(value);
      if (value?.hsn?.id) {
        setLastOptionsHsn([
          {
            label: `${value?.hsn?.hsnCode ?? ""} - ${
              value?.hsn?.hsnDescription ?? ""
            }`,
            value: value.hsn.id ?? null,
          },
        ]);
      }
      if (value) {
        form.reset({
          barcode: value?.barcode,
          description: value?.description,
          hsnId: {
            label: value?.hsn
              ? `${value?.hsn?.hsnCode} - ${value?.hsn?.hsnDescription}`
              : "",
            value: value?.hsn?.id,
          },
          id: value?.uuid,
          isActive: value?.isActive,
          isDeleted: value?.isDeleted,
          name: value?.name,
          unit: value?.unit,
          unitType: value?.unitType,
          uuid: value?.uuid,
          hindiName: value?.hindiName,
          costs: value?.costs,
          stock: {
            quantityAvailable: value?.stock?.quantityAvailable,
            reorderLevel: value?.stock?.reorderLevel,
            supplierName: {
              label: value?.stock?.supplierName,
              value: value?.stock?.supplierName,
            },
            source: {
              label: value?.stock?.source,
              value: value?.stock?.source,
            },
          },
        });
      }
    } catch (error) {
      console.log("🚀 ~ getProductById ~ error:", error);
    }
  };

  const { mutateAsync: updateProduct, isPending: isProductUpdationPending } =
    useMutation({
      mutationFn: productsApi.updateProduct,
    });

  return useMemo(
    () => ({
      getAllProductAsync,
      metaData,
      isLoadingMetaData,
      createProduct,
      isProductCreationPending,
      getProductById,
      lastOptionsHsn,
      setLastOptionsHsn,
      updateProduct,
      isProductUpdationPending,
      count,
      productData,
    }),
    [
      getAllProductAsync,
      metaData,
      isLoadingMetaData,
      createProduct,
      isProductCreationPending,
      getProductById,
      lastOptionsHsn,
      setLastOptionsHsn,
      updateProduct,
      isProductUpdationPending,
      count,
      productData,
    ]
  );
};

export default useProducts;
