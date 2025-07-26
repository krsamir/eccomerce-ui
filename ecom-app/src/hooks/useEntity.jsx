import { useQuery } from "@tanstack/react-query";

import { entitiesApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useEffect, useMemo } from "react";
import { useGlobalContext } from "@store";

const useEntity = ({ enabled = false }) => {
  const { dispatch } = useGlobalContext();
  const { data: { data: { data: entities = [] } = {} } = {} } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_ALL_ENTITIES_LIST],
    queryFn: entitiesApi.getAllEntitiesApi,
    enabled,
  });
  useEffect(() => {
    if (entities?.length > 0) {
      dispatch({
        type: CONSTANTS.GLOBAL_STORE.SET_ENTITIES,
        payload: entities,
      });
    }
    return () => {};
  }, [dispatch, entities?.length]);

  return useMemo(() => ({}), []);
};

export default useEntity;
