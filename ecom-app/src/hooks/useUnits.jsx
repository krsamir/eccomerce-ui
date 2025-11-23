import { useQuery } from "@tanstack/react-query";

import { unitsApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useEffect, useMemo } from "react";
import { useGlobalContext } from "@store";

const useEntity = ({ enabled = false }) => {
  const { dispatch } = useGlobalContext();
  const { data: { data: { data: units = [] } = {} } = {} } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_ALL_UNITS],
    queryFn: unitsApi.getAllUnits,
    enabled,
  });
  useEffect(() => {
    if (units?.length > 0) {
      dispatch({
        type: CONSTANTS.GLOBAL_STORE.SET_UNITS,
        payload: units,
      });
    }
    return () => {};
  }, [dispatch, units?.length]);

  return useMemo(() => ({}), []);
};

export default useEntity;
