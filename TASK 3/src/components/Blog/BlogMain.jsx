import { Link } from "react-router-dom";
import "../../Styles/blog.scss";
import { formatDate } from "../Dashboard/Details";

export default function BlogMain({
  title = "",
  createdBy = {},
  createdAt = "",
  id = "",
}) {
  return (
    <div className="blog">
      <div>
        <h3>{title}</h3>
        <Link to={`/blogs/view/${id}`}>
          <p>View &rarr;</p>
        </Link>
      </div>
      <p>
        Created On: <span>{formatDate(createdAt)}</span>
      </p>
      <p>
        CreatedBy : <span>{createdBy.username}</span>
      </p>
    </div>
  );
}
