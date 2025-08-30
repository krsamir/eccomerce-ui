import { useQuery } from "@tanstack/react-query";

import { userApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useEffect, useMemo } from "react";
import { useGlobalContext } from "@store";

const useUser = ({ enabled = false }) => {
  const { dispatch } = useGlobalContext();
  const { data: { data } = {} } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_LOGGED_IN_USER],
    queryFn: userApi.getLoggedInUser,
    enabled,
  });
  useEffect(() => {
    if (data) {
      dispatch({
        type: CONSTANTS.GLOBAL_STORE.SET_LOGGEDIN_USER,
        payload: data?.data,
      });
    }
  }, [dispatch, data]);

  return useMemo(() => ({}), []);
};

export default useUser;
