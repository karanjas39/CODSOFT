import { Link } from "react-router-dom";
import "../../Styles/blog.scss";
import { formatDate } from "../Dashboard/Details";

function Blog({
  title = "BLog Title",
  createdAt = "",
  id = "",
  setIsPopUp,
  setToDeleteBlog,
}) {
  function handleBlogDelete() {
    setIsPopUp(true);
    setToDeleteBlog(id);
  }

  return (
    <div className="blog">
      <div>
        <h3>{title}</h3>
        <Link to={`/dashboard/blog/view/${id}`}>
          <p>View &rarr;</p>
        </Link>
      </div>
      <p>
        Created On: <span>{formatDate(createdAt)}</span>
      </p>
      <div className="btns">
        <button onClick={handleBlogDelete}>Delete</button>
        <Link to={`/dashboard/blog/update/${id}`}>
          <button>Update</button>
        </Link>
      </div>
    </div>
  );
}

export default Blog;
