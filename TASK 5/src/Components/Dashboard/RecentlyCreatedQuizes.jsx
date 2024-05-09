import "../../Styles/dashboard.scss";
import PopUp from "../PopUp/PopUp";
import formatDate from "../../Utils/formatDate";
import { useEffect, useState } from "react";
import Notification from "../Notification/Notification";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../../constant";

function RecentlyCreatedQuizes({ title, description, _id, createdAt }) {
  const [ans, setAns] = useState(null);
  const [ques, setQues] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleQuizDelete() {
    setQues("Do you want to delete this quiz?");
  }

  useEffect(() => {
    async function deleteQuiz() {
      const response = await fetch(`${backend_url}/v1/api/user/quiz/delete`, {
        method: "POST",
        body: JSON.stringify({ _id }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setQues("");
        setMsg("Yout Quiz is deleted successfully.");
        navigate("/dashboard/creator");
      }
    }

    if (ans != null) {
      if (ans) {
        deleteQuiz();
      } else {
        setQues("");
      }
    }
  }, [ans]);

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
        <button onClick={handleQuizDelete}>Delete</button>
      </div>
      {ques && <PopUp setAns={setAns} ques={ques} />}
      {msg && <Notification msg={msg} setMsg={setMsg} />}
    </div>
  );
}

export default RecentlyCreatedQuizes;
