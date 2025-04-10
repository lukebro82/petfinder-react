import { Outlet } from "react-router-dom";
import { Header } from "../Header/index";

export const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
    </div>
  );
};
