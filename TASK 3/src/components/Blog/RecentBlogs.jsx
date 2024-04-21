import { useEffect, useState } from "react";
import "../../Styles/blog.scss";
import Blog from "./Blog";
import PopUp from "../PopUp/PopUp";

function RecentBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [IsPopUp, setIsPopUp] = useState();
  const [toDeleteBlog, setToDeleteBlog] = useState(null);

  useEffect(() => {
    async function getUserBlogs() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          "https://codsoft-x5ou.onrender.com/v1/api/user/blog/all",
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success == true) {
          setBlogs(data.blogs);
        }
      } catch (error) {
        setBlogs("There is a problem in fetching blogs.");
      }
    }
    getUserBlogs();
  }, []);

  return (
    <main className="recent-blogs">
      <h2>Recently Published Blogs</h2>
      <div className="list">
        {blogs.length != 0
          ? blogs.map((blog) => (
              <Blog
                title={blog.title}
                createdAt={blog.createdAt}
                key={blog._id}
                id={blog._id}
                setIsPopUp={setIsPopUp}
                setToDeleteBlog={setToDeleteBlog}
              />
            ))
          : "No blog is created yet."}
      </div>
      {IsPopUp && (
        <PopUp
          setIsPopUp={setIsPopUp}
          setBlogs={setBlogs}
          toDeleteBlog={toDeleteBlog}
        />
      )}
    </main>
  );
}

export default RecentBlogs;
