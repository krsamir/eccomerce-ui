import { createBrowserRouter, RouterProvider } from "react-router";
import React, { lazy, Suspense } from "react";
const ForgotPassword = lazy(() => import("@auth/ForgotPassword"));
const Login = lazy(() => import("@auth/Login"));
const Password = lazy(() => import("@auth/Password"));
const ProtectedRoute = lazy(() => import("@auth/ProtectedRoute"));
const Home = lazy(() => import("@home"));
import CONSTANTS from "@ecom/ui/constants";
import { Loader } from "@ecom/ui";
import { NotFound } from "@ecom/ui";
import { getRoleById } from "@utils";
const SuperAdminHome = lazy(() => import("@suadmin"));
const AdminHome = lazy(() => import("@admin"));
const Location = lazy(() => import("@suadmin/Location"));
const Master = lazy(() => import("@modules/Master"));
const Products = lazy(() => import("@modules/Products"));
const CreateMaster = lazy(() => import("@modules/Master/CreateMaster"));

const UserHome = lazy(() => import("@user").then((m) => ({ default: m.Home })));

const router = createBrowserRouter([
  {
    path: CONSTANTS.ROUTE_PATHS.HOME,
    element: <UserHome />,
  },
  {
    path: CONSTANTS.ROUTE_PATHS.ADMINISTRATION,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    children: [
      {
        path: `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN}`,
        element: <SuperAdminHome />,
        children: [
          {
            path: `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.LOCATION}`,
            element: (
              <ProtectedRoute
                hasAuthority={[getRoleById(CONSTANTS.ROLES_NAME.SUPER_ADMIN)]}
              >
                <Location />
              </ProtectedRoute>
            ),
          },
          {
            path: `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MASTER}`,
            element: (
              <ProtectedRoute
                hasAuthority={[getRoleById(CONSTANTS.ROLES_NAME.SUPER_ADMIN)]}
              >
                <Master />
              </ProtectedRoute>
            ),
          },
          {
            path: `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MAIN}/${CONSTANTS.ROUTE_PATHS.SUPER_ADMIN.MASTER}/create`,
            element: (
              <ProtectedRoute
                hasAuthority={[getRoleById(CONSTANTS.ROLES_NAME.SUPER_ADMIN)]}
              >
                <CreateMaster />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${CONSTANTS.ROUTE_PATHS.ADMIN.MAIN}`,
        element: <AdminHome />,
        children: [
          {
            path: `${CONSTANTS.ROUTE_PATHS.ADMINISTRATION}/${CONSTANTS.ROUTE_PATHS.ADMIN.MAIN}/${CONSTANTS.ROUTE_PATHS.ADMIN.PRODUCT}`,
            element: (
              <ProtectedRoute
                hasAuthority={[getRoleById(CONSTANTS.ROLES_NAME.ADMIN)]}
              >
                <Products />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
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
  {
    path: "*",
    element: <NotFound />,
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
