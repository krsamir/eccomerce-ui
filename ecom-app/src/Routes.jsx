import { createBrowserRouter, RouterProvider, useNavigate } from "react-router";
import React, { lazy, Suspense } from "react";
import { Button } from "@mui/material";
const ForgotPassword = lazy(() => import("@auth/ForgotPassword"));
const Login = lazy(() => import("@auth/Login"));
const Password = lazy(() => import("@auth/Password"));
const ProtectedRoute = lazy(() => import("@auth/ProtectedRoute"));
import CONSTANTS from "@ecom/ui/constants";

const LoginComponent = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={() => navigate(CONSTANTS.ROUTE_PATHS.FORGOT_PASSWORD)}
      >
        Navigate to Forget Password
      </Button>
    </React.Fragment>
  );
};
const router = createBrowserRouter([
  {
    path: CONSTANTS.ROUTE_PATHS.HOME,
    element: (
      <ProtectedRoute>
        <LoginComponent />,
      </ProtectedRoute>
    ),
  },
  {
    path: CONSTANTS.ROUTE_PATHS.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: CONSTANTS.ROUTE_PATHS.PASSWORD,
    element: <Password />,
  },
  {
    path: CONSTANTS.ROUTE_PATHS.LOGIN,
    element: <Login />,
  },
]);

function Routes() {
  return (
    <React.Fragment>
      <Suspense fallback={<h2>Loading....</h2>}>
        <RouterProvider router={router} />
      </Suspense>
    </React.Fragment>
  );
}

export default Routes;
