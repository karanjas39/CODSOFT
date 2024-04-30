import { Link } from "react-router-dom";
import "../../Styles/allQuiz.scss";
import formatDate from "../../Utils/formatDate";

export default function QuizCard({ quiz }) {
  const { title, description, createdBy, difficulty, _id, createdAt } = quiz;

  return (
    <div className="all-quiz-card">
      <h3>{title}</h3>
      <p className="des">
        {description.split(" ").length > 40
          ? [...description.split(" ").slice(0, 40).join(" "), "...."].join("")
          : description}
      </p>
      <p className="diff">
        <span>Difficulty:</span> {difficulty}
      </p>
      <p className="date">
        <span>CreatedOn:</span> {formatDate(createdAt)}
      </p>
      <div className="btns">
        <Link to={`/quiz/take/${_id}`}>
          <button>Give Test</button>
        </Link>
      </div>
    </div>
  );
}
