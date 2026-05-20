import React from "react";
import { useLocation } from "react-router";

export default function SettingPage() {
  const location = useLocation();
  const currPathname = location.pathname;

  return <div>This is setting page, pathname: {currPathname}</div>;
}
