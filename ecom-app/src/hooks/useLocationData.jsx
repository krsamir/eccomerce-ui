import { locationApi } from "@api";
import CONSTANTS from "../utils/constant";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useLocationData = () => {
  // get call
  const { data: response, isSuccess } = useQuery({
    queryFn: locationApi.getLocationApi,
    queryKey: [CONSTANTS.QUERY_KEYS.GET_LOCATION_QUERY],
  });

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
