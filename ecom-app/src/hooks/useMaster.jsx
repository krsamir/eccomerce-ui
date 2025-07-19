import { useQuery } from "@tanstack/react-query";

import { masterApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useEffect, useMemo } from "react";
import { useGlobalContext } from "@store";

const useMaster = ({ id = "", enabled = false, rolesEnabled = false }) => {
  const { dispatch } = useGlobalContext();
  const { data } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_ALL_MASTER],
    queryFn: masterApi.getAllUserData,
    enabled,
  });

  const { data: { data: { data: user = null } = {} } = {} } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_USER_BY_ID, id],
    queryFn: () => masterApi.getUserByIdApi(id),
    enabled: !!id,
  });

  const { data: { data: { data: roles = null } = {} } = {} } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_USER_BY_ID, id],
    queryFn: () => masterApi.getAllRoles(),
    enabled: rolesEnabled,
  });
  useEffect(() => {
    if (roles?.length > 0) {
      dispatch({
        type: CONSTANTS.GLOBAL_STORE.SET_ROLES,
        payload: roles,
      });
    }
    return () => {};
  }, [roles?.length]);

  return useMemo(
    () => ({ masterData: data, user, roles }),
    [data?.data?.data, user]
  );
};

export default useMaster;
