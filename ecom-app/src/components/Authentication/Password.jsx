import {
  Paper,
  TextField as MUITextField,
  Button as MUIButton,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import Logo from "../../assets/android-chrome-512x512.png";
import { useLocation, useNavigate } from "react-router";
import { useAuthentication } from "@hooks";
import CONSTANTS from "@ecom/ui/constants";

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
function Password() {
  const { setPassword } = useAuthentication();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setPassword(data, {
      onSuccess(res) {
        const resp = res.data;
        if (resp?.status === CONSTANTS.STATUS.SUCCESS) {
          navigate(CONSTANTS.ROUTE_PATHS.LOGIN);
        }
      },
    });
  };

  const checkIsError = useCallback(
    (key) => Object.keys(errors[key] ?? {})?.length > 0,
    [errors]
  );

  const location = useLocation();

  useEffect(() => {
    setValue("email", location.state, { shouldDirty: true });
    () => {
      setValue("email", "");
    };
  }, [location.state, setValue]);

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
                  Set Password
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
                      {...field}
                      error={checkIsError("email")}
                      helperText={
                        checkIsError("email") && "Enter email address"
                      }
                      disabled
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id="password"
                      label="Password"
                      variant="filled"
                      fullWidth
                      {...field}
                      error={checkIsError("password")}
                      helperText={checkIsError("password") && "Enter Password"}
                    />
                  )}
                />
                <Button variant="contained" type="submit">
                  Set Password
                </Button>
              </Container>
            </form>
          </Paper>
        </Layout>
      </WindowContainer>
    </>
  );
}

export default Password;
