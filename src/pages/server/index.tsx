import { useLocation } from "react-router";

export default function ServerPage() {
  const location = useLocation();
  const currPathname = location.pathname;
  return <div>This is server page, pathname: {currPathname}</div>;
}
