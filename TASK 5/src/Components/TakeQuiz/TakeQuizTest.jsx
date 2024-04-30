import formatDate from "../../Utils/formatDate";

export default function TakeQuizTest({ quiz }) {
  console.log(quiz);
  return (
    <div className="take-quiz-test">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <div>
        <div className="quiz-dt">
          <p>
            <span>Created On:</span> {formatDate(quiz.createdAt)}
          </p>
          <p>
            <span>Passing Score:</span> {quiz.passScore}
          </p>
        </div>
        <div className="creator">
          <p>
            <span>Created By:</span> {quiz.createdBy.name}
          </p>
          <a href={`mailto:${quiz.createdBy.email}`}>
            <button>Contact Creator</button>
          </a>
        </div>
      </div>
      <div className="mcqs">
        <div className="ques">
          <p>What is the age of Delhi?</p>
          <div className="options">
            <p>18 years</p>
            <p>14 years</p>
            <p>100 years</p>
          </div>
        </div>
      </div>
    </div>
  );
}
