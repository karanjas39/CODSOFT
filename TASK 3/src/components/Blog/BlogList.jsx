import React from "react";
import Header from "../Header/Header";

const btnObj = {
  text: "Regsiter",
  path: "/register",
};

export default function BlogList() {
  return (
    <>
      <Header btnObj={btnObj} />
      <section className="blogs-list-main">
        <h2>Blogs</h2>
        <div></div>
      </section>
    </>
  );
}
