import { useState } from "react";
import formatDate from "../../Utils/formatDate";
import TakeQuizQuestion from "./TakeQuizQuestion";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";

export default function TakeQuizTest({ quiz }) {
  const newMcqSet = quiz.mcq.map((ques) => {
    return {
      _id: ques._id,
      solution: null,
    };
  });
  const [mcq, setMcq] = useState([...newMcqSet]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  async function handleSubmitQuiz() {
    const token = sessionStorage.getItem("token");
    if (!token) return navigate("/login");

    const isUnselected = mcq.filter((ques) => ques.solution == null);
    if (isUnselected.length != 0) {
      setMsg("You have not completed all the questions.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/v1/api/user/quiz/take",
        {
          method: "POST",
          body: JSON.stringify({ quizId: quiz._id, mcq }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        const message =
          data.status !== 403
            ? data.message
            : "You have to login to submit the quiz.";
        throw new Error(message);
      }
      setMsg(data.message);
      setTimeout(() => {
        navigate("/dashboard/taker");
      }, 5000);
    } catch (error) {
      setMsg(error.message);
    } finally {
      setLoading(false);
    }
  }

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
        {quiz.mcq.map((ques, i) => (
          <TakeQuizQuestion
            ques={{ ...ques, i }}
            key={ques._id}
            setMcq={setMcq}
          />
        ))}
      </div>
      <button onClick={handleSubmitQuiz}>
        Submit Quiz{" "}
        {loading && (
          <img className="loader" src="/loader.svg" alt="Loader Image" />
        )}
      </button>
      {msg && <Notification msg={msg} setMsg={setMsg} />}
    </div>
  );
}
