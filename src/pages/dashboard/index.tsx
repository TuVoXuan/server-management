import React from "react";
import { useLocation } from "react-router";

export default function DashboardPage() {
  const location = useLocation();
  const currPathname = location.pathname;

  return <div>this is dashboard page, pathname: {currPathname}</div>;
}
