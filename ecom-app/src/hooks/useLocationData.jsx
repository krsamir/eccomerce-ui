import { locationApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useGlobalContext } from "@store";

const useLocationData = ({ enabled = false }) => {
  const { dispatch } = useGlobalContext();

  const { data: response, isSuccess } = useQuery({
    queryFn: locationApi.getLocationApi,
    queryKey: [CONSTANTS.QUERY_KEYS.GET_LOCATION_QUERY],
    enabled,
  });

  useEffect(() => {
    if ((response?.data?.data ?? [])?.length > 0) {
      dispatch({
        type: CONSTANTS.GLOBAL_STORE.SET_LOCATION_LIST,
        payload: response?.data?.data,
      });
    }
  }, [response]);

  const { mutate: createLocation } = useMutation({
    mutationFn: locationApi.createLocationApi,
  });

  const { mutate: updateLocation } = useMutation({
    mutationFn: locationApi.updateLocationApi,
  });

  const { mutate: deleteLocation } = useMutation({
    mutationFn: locationApi.deleteLocationApi,
  });

  return useMemo(
    () => ({
      createLocation,
      response,
      isSuccess,
      updateLocation,
      deleteLocation,
    }),
    [createLocation, deleteLocation, isSuccess, response, updateLocation]
  );
};

export default useLocationData;
