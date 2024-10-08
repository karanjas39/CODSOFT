import "../../Styles/blog.scss";
import { useLoaderData } from "react-router-dom";
import BlogMain from "./BlogMain";
import { backend_url } from "../../constants";

export default function BlogList() {
  const blogs = useLoaderData();
  return (
    <section className="blogs-list-main">
      <h2>Blogs</h2>
      <div className="list">
        {blogs.length == 0
          ? ""
          : blogs.map((blog) => (
              <BlogMain
                title={blog.title}
                key={blog._id}
                id={blog._id}
                createdAt={blog.createdAt}
                createdBy={blog.createdBy}
              />
            ))}
      </div>
    </section>
  );
}

export async function getAllBlogs() {
  const response = await fetch(`${backend_url}/v1/api/blog/all`, {
    method: "GET",
    headers: {
      "COntent-type": "application/json",
    },
  });
  const data = await response.json();
  if (data.success == true) {
    return data.blogs;
  }
  return [];
}
