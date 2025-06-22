import {
  Paper,
  TextField as MUITextField,
  Button as MUIButton,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import Logo from "../../assets/android-chrome-512x512.png";
import CONSTANTS from "@ecom/ui/constants";
import { useAuthentication } from "@hooks";

const WindowContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Layout = styled.div`
  width: 500px;
  min-width: 500px;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const TextField = styled(MUITextField)`
  margin-bottom: 10px;
`;
const Button = styled(MUIButton)`
  margin-bottom: 10px;
  &.login {
    text-decoration: underline;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
`;
function ForgotPassword() {
  const { forgotPassword, verification } = useAuthentication();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      token: "",
    },
  });
  const onSubmit = (data) => {
    if (data?.token) {
      verification(data, {
        onSuccess(res) {
          const resp = res.data;
          console.info(data);
          if (resp?.status === CONSTANTS.STATUS.SUCCESS) {
            navigate(CONSTANTS.ROUTE_PATHS.PASSWORD, { state: data?.email });
          }
        },
      });
    } else {
      forgotPassword(data, {
        onSuccess(res) {
          const resp = res.data;
          if (resp?.status === CONSTANTS.STATUS.SUCCESS) {
            setIsEmailSent(true);
          }
        },
      });
    }
  };

  const checkIsError = useCallback(
    (key) => Object.keys(errors[key] ?? {})?.length > 0,
    [errors]
  );

  const [isEmailSent, setIsEmailSent] = useState(false);

  return (
    <>
      <WindowContainer>
        <Layout>
          <Paper elevation={5}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Container>
                <ImageContainer>
                  <Image src={Logo} alt="" />
                </ImageContainer>
                <Typography
                  variant="button"
                  gutterBottom
                  sx={{ display: "block", textAlign: "center" }}
                >
                  Forgot Password ?
                </Typography>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id="email"
                      label="Email"
                      variant="filled"
                      fullWidth
                      disabled={isEmailSent}
                      {...field}
                      error={checkIsError("email")}
                      helperText={
                        checkIsError("email") && "Enter email address"
                      }
                    />
                  )}
                />
                {isEmailSent && (
                  <Controller
                    name="token"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="token"
                        label="OTP"
                        variant="filled"
                        fullWidth
                        {...field}
                        error={checkIsError("token")}
                        helperText={checkIsError("token") && "Enter OTP"}
                      />
                    )}
                  />
                )}
                <Button variant="contained" type="submit">
                  {isEmailSent ? "Verify" : "Send OTP"}
                </Button>
                <Button
                  variant="text"
                  className="login"
                  onClick={() => navigate(CONSTANTS.ROUTE_PATHS.LOGIN)}
                >
                  Go to Login
                </Button>
              </Container>
            </form>
          </Paper>
        </Layout>
      </WindowContainer>
    </>
  );
}

export default ForgotPassword;
