import { useMutation, useQuery } from "@tanstack/react-query";

import { userApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useEffect, useMemo } from "react";
import { useGlobalContext } from "@store";

const useUser = ({}) => {
  // const { dispatch } = useGlobalContext();
  // const { data: { data } = {} } = useQuery({
  //   queryKey: [CONSTANTS.QUERY_KEYS.GET_LOGGED_IN_USER],
  //   queryFn: masterApi.getLoggedInUser,
  //   enabled: isLoggedInUser,
  // });
  // useEffect(() => {
  //   if (data) {
  //     dispatch({
  //       type: CONSTANTS.GLOBAL_STORE.SET_LOGGEDIN_USER,
  //       payload: data?.data,
  //     });
  //   }
  // }, [dispatch, data]);

  const { mutate: registerUser, isPending: isPendingUser } = useMutation({
    mutationFn: userApi.registerUser,
  });

  const { mutate: confirmAccount, isPending: isPendingTokenCheck } =
    useMutation({
      mutationFn: userApi.confirmAccountApi,
    });

  const { mutate: setPassword, isPending: isPendingPasswordSet } = useMutation({
    mutationFn: userApi.setPasswordApi,
  });

  const { mutate: loginWithCreds, isPending: isPendingLogin } = useMutation({
    mutationFn: userApi.loginApi,
  });

  return useMemo(
    () => ({
      registerUser,
      isPendingUser,
      confirmAccount,
      isPendingTokenCheck,
      isPendingPasswordSet,
      setPassword,
      isPendingLogin,
      loginWithCreds,
    }),
    [
      registerUser,
      isPendingUser,
      confirmAccount,
      setPassword,
      isPendingTokenCheck,
      isPendingPasswordSet,
      isPendingLogin,
      loginWithCreds,
    ]
  );
};

export default useUser;
