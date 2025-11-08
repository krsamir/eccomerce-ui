import * as React from "react";
import Btn from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { t } from "i18next";
import styled from "@emotion/styled";
import icon from "../../../../assets/android-chrome-512x512.png";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useUser } from "@hooks";
import CONSTANTS from "@ecom/ui/constants";

const LoginButton = styled.button`
  background-color: #fff;
  border-radius: 6px;
  width: 100px;
  height: 32px;
  border: none;
  margin-right: 20px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  height: 50px;
  width: 50px;
`;

const TextWrapper = styled.div`
  text-align: center;
  margin: 25px 0;
  font-size: 20px;
  font-weight: 700;
`;

const FormHandler = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled(TextField)`
  margin-bottom: 15px;
`;

const Button = styled(Btn)`
  margin-bottom: 15px;
`;

const STATE = {
  LOGIN: "LOGIN",
  SIGN_UP: "SIGN_UP",
  ACCOUNT_CONFIRMATION: "ACCOUNT_CONFIRMATION",
  SET_PASSWORD: "SET_PASSWORD",
};

export default function LoginComponent() {
  const {
    isPendingUser,
    registerUser,
    confirmAccount,
    isPendingTokenCheck,
    isPendingPasswordSet,
    setPassword,
    isPendingLogin,
    loginWithCreds,
  } = useUser({});

  const [formState, setFormState] = useState(STATE.LOGIN);

  const [open, setOpen] = React.useState(false);

  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  const [registerValue, setRegisterValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    mobile: "",
  });

  const [accountConfirmation, setAccountConfirmation] = useState({
    email: "",
    token: "",
    password: "",
  });

  const [
    showPasswordFieldForConfirmationm,
    setShowPasswordFieldForConfirmationm,
  ] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = ({ target: { value, name } }, target = STATE.LOGIN) => {
    if (target === STATE.LOGIN) {
      const val = { ...loginValue };
      val[name] = value;
      setLoginValue(val);
    } else if (target === STATE.SIGN_UP) {
      const val = { ...registerValue };
      val[name] = value;
      setRegisterValue(val);
    } else if (target === STATE.ACCOUNT_CONFIRMATION) {
      const val = { ...accountConfirmation };
      val[name] = value;
      setAccountConfirmation(val);
    }
  };
  const handleSubmit = (target = STATE.LOGIN) => {
    if (target === STATE.LOGIN) {
      loginWithCreds(
        { ...loginValue },
        {
          onSuccess(response) {
            const data = response.data;
            setLoginValue({ email: "", password: "" });
            handleClose();
          },
        }
      );
    }
    if (target === STATE.SIGN_UP) {
      registerUser(
        { ...registerValue },
        {
          onSuccess(response) {
            if (response.data.status === CONSTANTS.STATUS.SUCCESS) {
              setAccountConfirmation((prev) => ({
                ...prev,
                email: registerValue.email,
              }));
              setRegisterValue({
                email: "",
                firstName: "",
                lastName: "",
                mobile: "",
                userName: "",
              });
              setFormState(STATE.ACCOUNT_CONFIRMATION);
            }
          },
        }
      );
    }
    if (target === STATE.ACCOUNT_CONFIRMATION) {
      const payload = { ...accountConfirmation };
      delete payload.password;
      confirmAccount(
        { ...payload },
        {
          onSuccess(response) {
            const data = response.data;
            if (data.data) {
              setShowPasswordFieldForConfirmationm(true);
            }
          },
        }
      );
    }
    if (target === STATE.SET_PASSWORD) {
      const payload = { ...accountConfirmation };
      // delete payload.token;
      setPassword(
        { ...payload },
        {
          onSuccess(response) {
            const data = response.data;
            setAccountConfirmation({ email: "", password: "", token: "" });
            setFormState(STATE.LOGIN);
          },
        }
      );
    }
  };
  return (
    <React.Fragment>
      <LoginButton variant="outlined" onClick={handleClickOpen}>
        {t("login")}
      </LoginButton>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <DialogContent>
          <ImageWrapper>
            <Icon src={icon} />
          </ImageWrapper>
          <TextWrapper>{t("logo_title")}</TextWrapper>
          <FormHandler>
            {formState === STATE.LOGIN && (
              <>
                <Text
                  variant="outlined"
                  placeholder="Email"
                  name="email"
                  value={loginValue.email}
                  onChange={(e) => handleChange(e, STATE.LOGIN)}
                />
                <Text
                  variant="outlined"
                  placeholder="Password"
                  name="password"
                  value={loginValue.password}
                  onChange={(e) => handleChange(e, STATE.LOGIN)}
                />
                <Button
                  variant="contained"
                  disabled={isPendingLogin}
                  onClick={() => handleSubmit(STATE.LOGIN)}
                >
                  {t("login")}
                </Button>
              </>
            )}
            {formState === STATE.SIGN_UP && (
              <>
                <Text
                  variant="outlined"
                  placeholder="First Name"
                  name="firstName"
                  value={registerValue.firstName}
                  onChange={(e) => handleChange(e, STATE.SIGN_UP)}
                />
                <Text
                  variant="outlined"
                  placeholder="Last Name"
                  name="lastName"
                  value={registerValue.lastName}
                  onChange={(e) => handleChange(e, STATE.SIGN_UP)}
                />
                <Text
                  variant="outlined"
                  placeholder="Email"
                  name="email"
                  value={registerValue.email}
                  onChange={(e) => handleChange(e, STATE.SIGN_UP)}
                />
                <Text
                  variant="outlined"
                  placeholder="User Name"
                  name="userName"
                  value={registerValue.userName}
                  onChange={(e) => handleChange(e, STATE.SIGN_UP)}
                />
                <Text
                  variant="outlined"
                  placeholder="Mobile"
                  name="mobile"
                  value={registerValue.mobile}
                  onChange={(e) => handleChange(e, STATE.SIGN_UP)}
                />
                <Button
                  variant="contained"
                  onClick={() => handleSubmit(STATE.SIGN_UP)}
                  disabled={isPendingUser}
                >
                  {t("sign_up")}
                </Button>
              </>
            )}
            {formState === STATE.ACCOUNT_CONFIRMATION && (
              <>
                <Text
                  variant="outlined"
                  placeholder="Email"
                  name="email"
                  value={accountConfirmation.email}
                  disabled
                />
                <Text
                  variant="outlined"
                  placeholder="Token"
                  name="token"
                  value={accountConfirmation.token}
                  onChange={(e) => handleChange(e, STATE.ACCOUNT_CONFIRMATION)}
                  disabled={showPasswordFieldForConfirmationm}
                />

                {showPasswordFieldForConfirmationm && (
                  <Text
                    variant="outlined"
                    placeholder="Password"
                    name="password"
                    value={accountConfirmation.password}
                    onChange={(e) =>
                      handleChange(e, STATE.ACCOUNT_CONFIRMATION)
                    }
                  />
                )}

                {!showPasswordFieldForConfirmationm ? (
                  <Button
                    variant="contained"
                    onClick={() => handleSubmit(STATE.ACCOUNT_CONFIRMATION)}
                    disabled={isPendingTokenCheck}
                  >
                    {t("confirm_token")}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleSubmit(STATE.SET_PASSWORD)}
                    disabled={isPendingPasswordSet}
                  >
                    {t("set_password")}
                  </Button>
                )}
              </>
            )}
            {formState === STATE.LOGIN && (
              <Button
                variant="text"
                onClick={() => setFormState(() => STATE.SIGN_UP)}
              >
                {t("sign_up")}
              </Button>
            )}
            {formState === STATE.SIGN_UP && (
              <Button
                variant="text"
                onClick={() => setFormState(() => STATE.LOGIN)}
              >
                {t("login")} ?
              </Button>
            )}
          </FormHandler>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
