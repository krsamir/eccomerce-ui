import { useMutation, useQuery } from "@tanstack/react-query";

import { userApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useEffect, useMemo } from "react";
import { useGlobalContext } from "@store";

const useUser = ({}) => {
  const { dispatch } = useGlobalContext();

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
  const { mutate: initiateForgotPassword } = useMutation({
    mutationFn: userApi.forgotPasswordApi,
  });

  const {
    data: { data: loggedInUser } = {},
    isError,
    error,
  } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_LOGGED_IN_USER],
    queryFn: userApi.getLoggedInUser,
    enabled: !!window.localStorage.getItem(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN),
  });

  useEffect(() => {
    if (loggedInUser) {
      dispatch({
        type: CONSTANTS.GLOBAL_STORE.SET_LOGGED_IN_USER,
        payload: loggedInUser?.user,
      });
    }
  }, [dispatch, loggedInUser]);

  useEffect(() => {
    if (isError) {
      if (error.status === 404) {
        window.localStorage.clear();
      }
    }
    return () => {};
  }, [isError, error]);

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
      initiateForgotPassword,
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
      initiateForgotPassword,
    ]
  );
};

export default useUser;
