import "../../Styles/dashboard.scss";
import formatDate from "../../Utils/formatDate";

function RecentlyCreatedQuizes({ title, description, _id, createdAt }) {
  return (
    <div className="recentlyCreatedQuizTemplate">
      <h3>{title}</h3>
      <p>
        {description.split(" ").length > 40
          ? [...description.split(" ").slice(0, 40).join(" "), "...."].join("")
          : description}
      </p>
      <p className="date">Created On: {formatDate(createdAt)}</p>
      <div className="btns">
        <button>Delete</button>
      </div>
    </div>
  );
}

export default RecentlyCreatedQuizes;
