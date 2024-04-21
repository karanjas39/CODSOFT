import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const btnObj = {
  text: "Regsiter",
  path: "/register",
};

const links = [
  {
    path: "/blogs",
    text: "Blogs",
  },
];

function BlogOutlet() {
  return (
    <>
      <Header btnObj={btnObj} links={links} />
      <Outlet />
    </>
  );
}

export default BlogOutlet;
