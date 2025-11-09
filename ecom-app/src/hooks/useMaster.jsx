import { useMutation, useQuery } from "@tanstack/react-query";

import { masterApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useEffect, useMemo } from "react";
import { useGlobalContext } from "@store";

const useMaster = ({
  id = "",
  enabled = false,
  rolesEnabled = false,
  isLoggedInUser = false,
}) => {
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
    queryKey: [CONSTANTS.QUERY_KEYS.GET_ALL_ROLES],
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
  }, [dispatch, roles, roles?.length]);

  const { mutate: checkUserName } = useMutation({
    mutationFn: masterApi.checkIfUserExistsApi,
  });

  const { mutate: createUser } = useMutation({
    mutationFn: masterApi.createMasterUser,
  });

  const { mutate: updateUser } = useMutation({
    mutationFn: masterApi.updateMasterUser,
  });

  const { data: { data: loggedInUser } = {} } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_LOGGED_IN_USER_MASTER],
    queryFn: masterApi.getLoggedInUser,
    enabled: isLoggedInUser,
  });
  useEffect(() => {
    if (loggedInUser) {
      dispatch({
        type: CONSTANTS.GLOBAL_STORE.SET_LOGGEDIN_MASTER_USER,
        payload: loggedInUser?.data,
      });
    }
  }, [dispatch, loggedInUser]);

  return useMemo(
    () => ({
      masterData: data,
      user,
      roles,
      checkUserName,
      createUser,
      updateUser,
    }),
    [data, user, roles, checkUserName, createUser, updateUser]
  );
};

export default useMaster;
