import { useLoaderData } from "react-router-dom";

import "../../Styles/blog.scss";
import { formatDate } from "../Dashboard/Details";

export default function BlogListView() {
  const { blog } = useLoaderData();

  return (
    <section className="blog-view">
      <h2>{blog.title}</h2>
      <div>
        <p>
          Created On: <span>{formatDate(blog.createdAt)}</span>
        </p>
        <p>
          By <span>{blog.createdBy.username}</span>
        </p>
      </div>
      <p>{blog.description.replace(/<br>/g, "\n")}</p>
      <a href={`mailto:${blog.createdBy.email}`} target="_blank">
        <button>Contact Author</button>
      </a>
    </section>
  );
}
