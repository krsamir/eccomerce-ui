import { authenticationApi } from "@api";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

const useAuthentication = () => {
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
  });

  return useMemo(
    () => ({ forgotPassword, verification, setPassword, setLogin }),
    [forgotPassword, setPassword, verification, setLogin]
  );
};

export default useAuthentication;
