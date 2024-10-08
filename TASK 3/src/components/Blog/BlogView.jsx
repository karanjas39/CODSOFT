import { useLoaderData } from "react-router-dom";
import "../../Styles/blog.scss";
import { formatDate } from "../Dashboard/Details";
import { backend_url } from "../../constants";

export default function BlogView() {
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

export async function getBlog({ params }) {
  const response = await fetch(
    `${backend_url}/v1/api/blog/details?_id=${params.bid}`,
    {
      method: "GET",
      headers: {
        "COntent-type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}
