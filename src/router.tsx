import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "./components/layouts/main-layout";
import DashboardPage from "./pages/dashboard";
import ServerPage from "./pages/server";
import SettingPage from "./pages/setting";
import AppPath from "./constants/app-path";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: AppPath.INDEX,
        element: <Navigate to={AppPath.DASHBOARD} />,
      },
      {
        index: true,
        path: AppPath.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: AppPath.SERVER,
        element: <ServerPage />,
      },
      {
        path: AppPath.SETTING,
        element: <SettingPage />,
      },
    ],
  },
]);

export default router;
