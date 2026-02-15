import { useMutation, useQuery } from "@tanstack/react-query";

import { categoriesApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useEffect, useMemo } from "react";
import { useGlobalContext } from "@store";

const useCategories = ({ id = "", enabled = false }) => {
  const { dispatch } = useGlobalContext();
  const { data: { data: { data: categories = [] } = {} } = {} } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_ALL_CATEGORIES],
    queryFn: categoriesApi.getAllCategories,
    enabled,
  });

  const { data: { data: { data: categoryById = {} } = {} } = {} } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_CATEGORY_BY_ID, id],
    queryFn: () => categoriesApi.getCategoryById(id),
    enabled: !!id,
  });

  const { mutate: createCategory } = useMutation({
    mutationFn: categoriesApi.createCategoryApi,
  });

  const { mutate: updateCategory } = useMutation({
    mutationFn: categoriesApi.updateCategoryApi,
  });

  useEffect(() => {
    if (categories) {
      dispatch({
        type: CONSTANTS.GLOBAL_STORE.SET_CATEGORIES,
        payload: categories,
      });
    }
  }, [dispatch, categories]);

  const { mutateAsync: uploadMedia } = useMutation({
    mutationFn: (payload) => categoriesApi.uploadMediaApi(payload),
  });

  const { mutateAsync: deleteMedia } = useMutation({
    mutationFn: (payload) => categoriesApi.deleteMediaApi(payload),
  });

  const { mutate: sync } = useMutation({
    mutationFn: () => categoriesApi.syncCategories(),
  });
  return useMemo(
    () => ({
      categories,
      createCategory,
      categoryById,
      updateCategory,
      uploadMedia,
      deleteMedia,
      sync,
    }),
    [
      categories,
      createCategory,
      categoryById,
      updateCategory,
      uploadMedia,
      deleteMedia,
      sync,
    ],
  );
};

export default useCategories;
