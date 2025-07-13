import { entityApi } from "@api";
import CONSTANTS from "../utils/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useEntity = () => {
  const { data: response, isSuccess } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_ENTITY_QUERY],
    queryFn: entityApi.getAll,
    enabled: true,
  });

  const { mutate: createEntity } = useMutation({
    mutationFn: entityApi.create,
  });

  const { mutate: updateEntity } = useMutation({
    mutationFn: entityApi.verificationApi,
  });

  const { mutate: deleteEntity } = useMutation({
    mutationFn: entityApi.setPasswordApi,
  });

  return useMemo(
    () => ({
      createEntity,
      updateEntity,
      deleteEntity,
      isSuccess,
      entityList: response?.data,
    }),
    [createEntity, updateEntity, deleteEntity, response, isSuccess]
  );
};

export default useEntity;
