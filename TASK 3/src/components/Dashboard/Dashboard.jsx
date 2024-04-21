import "../../Styles/dashboard.scss";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const links = [
  { text: "Dashboard", path: "/dashboard/user" },
  { text: "Verify Email", path: "/dashboard/user/verify" },
  { text: "Create Blog", path: "/dashboard/blog/create" },
];

function Dashboard() {
  return (
    <>
      <Header btnObj={{ text: "Logout", path: "/" }} links={links} />
      <Outlet />
    </>
  );
}

export default Dashboard;
