import { createBrowserRouter, RouterProvider } from "react-router";
import React, { lazy, Suspense } from "react";
const ForgotPassword = lazy(() => import("@auth/ForgotPassword"));
const Login = lazy(() => import("@auth/Login"));
const Password = lazy(() => import("@auth/Password"));
const ProtectedRoute = lazy(() => import("@auth/ProtectedRoute"));
const Home = lazy(() => import("@home"));
import CONSTANTS from "@ecom/ui/constants";
import { Loader } from "@ecom/ui";

const router = createBrowserRouter([
  {
    path: CONSTANTS.ROUTE_PATHS.HOME,
    element: (
      <ProtectedRoute>
        <Home />
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
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </React.Fragment>
  );
}

export default Routes;
