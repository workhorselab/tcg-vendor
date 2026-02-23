import { Outlet } from "react-router";
import { GlobalNav } from "~/components/GlobalNav";

export default function PublicLayout() {
  return (
    <>
      <GlobalNav />
      <Outlet />
    </>
  );
}
