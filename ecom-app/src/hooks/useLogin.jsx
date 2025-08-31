import { authenticationApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate } from "react-router";

const storage = window.localStorage;

const useAuthentication = () => {
  const navigate = useNavigate();

  const { mutate: forgotPassword } = useMutation({
    mutationFn: authenticationApi.forgotPasswordApi,
  });

  const { mutate: verification } = useMutation({
    mutationFn: authenticationApi.verificationApi,
  });

  const { mutate: setPassword } = useMutation({
    mutationFn: authenticationApi.setPasswordApi,
  });

  const { mutate: setLogin } = useMutation({
    mutationFn: authenticationApi.loginApi,
    onSuccess(res) {
      const resp = res.data;
      if (resp?.status === CONSTANTS.STATUS.SUCCESS) {
        if (resp?.role?.length) {
          storage.setItem(CONSTANTS.STORAGE_KEYS.ROLE, resp?.role);
        }
        storage.setItem(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN, resp?.token);
        navigate(CONSTANTS.ROUTE_PATHS.ADMINISTRATION);
      }
    },
  });

  return useMemo(
    () => ({ forgotPassword, verification, setPassword, setLogin }),
    [forgotPassword, setPassword, verification, setLogin]
  );
};

export default useAuthentication;
