import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import formatDate from "../../Utils/formatDate";
import { MdEmail } from "react-icons/md";
import { FaCertificate, FaUser } from "react-icons/fa";
import "../../Styles/dashboard.scss";
import Notification from "../Notification/Notification";
import { backend_url, frontend_url } from "../../constant";

const links = [{ text: "Take Quiz", to: "/quiz/all" }];

const btns = [
  {
    text: "Logout",
    to: "/",
  },
];

export default function DashboardTaker() {
  const {
    data1: { user },
    data2: { quizes },
  } = useLoaderData();
  const [firstLetter, ...last] = user?.role?.split("");
  const [greeting, setGreeting] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning,");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon,");
    } else {
      setGreeting("Good evening,");
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  function handleShareBtn(id) {
    const url = `${frontend_url}/quiz/certificate/${id}`;
    const textarea = document.createElement("textarea");
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setMsg("Link is copied to clipboard.");
  }

  return (
    <section className="dashboard">
      <NavBar links={links} btns={btns} />
      <div>
        <div className="user-card">
          <h1>
            <span>{greeting}</span> {user.name}
          </h1>
          <p>Joined On: {formatDate(user.createdAt)}</p>
          <div>
            <p>
              <FaUser /> Role:{" "}
              <span>{firstLetter.toUpperCase() + last.join("")}</span>
            </p>
            <p>
              <MdEmail /> Email: <span>{user.email}</span>
            </p>
            <p>
              <FaCertificate />{" "}
              <span>{user.verified ? "Verified" : "Not verified"}</span>
            </p>
          </div>
        </div>
        <hr />
        <div className="user-created-quiz">
          <h2>Recently Taken Quiz</h2>
          <div className="recent-taken-quiz">
            {quizes.length != 0
              ? quizes.map((quiz) => (
                  <div className="recent-quiz-template" key={quiz._id}>
                    <h3>{quiz.quizId.title}</h3>
                    <p>
                      <span>Attempt:</span> {quiz.attempt}
                    </p>
                    <p>
                      <span>Attempted On:</span> {formatDate(quiz.createdAt)}
                    </p>
                    <div className="btns">
                      <Link to={`/quiz/certificate/${quiz._id}`}>
                        <button>Show Certificate</button>
                      </Link>
                      <button onClick={() => handleShareBtn(quiz._id)}>
                        Share
                      </button>
                    </div>
                  </div>
                ))
              : "No quiz has been taken yet."}
          </div>
        </div>
        {msg && <Notification msg={msg} setMsg={setMsg} />}
      </div>
    </section>
  );
}

export async function getTakerDetail() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized access.");
  }
  const response1 = fetch(`${backend_url}/v1/api/user`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response2 = fetch(`${backend_url}/v1/api/user/quiz/take/all`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const [res1, res2] = await Promise.all([response1, response2]);
  const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

  if (!data1.success) {
    throw new Error(data1.message);
  }
  if (data1.user.role != "taker") throw new Error("Unauthorized access.");
  return { data1, data2 };
}
