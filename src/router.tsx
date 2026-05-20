import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "./components/layouts/main-layout";
import DashboardPage from "./pages/dashboard";
import InfrastructureServerPage from "./pages/infracstructure/servers";
import SettingPage from "./pages/setting";
import AppPath from "./constants/app-path";
import InfrastructureLocationPage from "./pages/infracstructure/locations";

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
        path: AppPath.INFRASTRUCTURE,
        children: [
          {
            index: true,
            element: <Navigate to={AppPath.INFRASTRUCTURE_SERVERS} />,
          },
          {
            path: AppPath.INFRASTRUCTURE_SERVERS,
            element: <InfrastructureServerPage />,
          },
          {
            path: AppPath.INFRASTRUCTURE_LOCATIONS,
            element: <InfrastructureLocationPage />,
          },
        ],
      },
      {
        path: AppPath.SETTING,
        element: <SettingPage />,
      },
    ],
  },
]);

export default router;
