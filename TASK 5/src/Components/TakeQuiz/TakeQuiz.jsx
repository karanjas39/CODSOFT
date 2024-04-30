import { useLoaderData } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "../../Styles/takeQuiz.scss";
import TakeQuizTest from "./TakeQuizTest";

const links = [{ text: "Home", to: "/dashboard/taker" }];

const btns = [
  {
    text: "Logout",
    to: "/",
  },
];

export default function TakeQuiz() {
  const { quiz } = useLoaderData();
  return (
    <section className="takeQuiz-section">
      <NavBar links={links} btns={btns} />
      <TakeQuizTest quiz={quiz} />
    </section>
  );
}

export async function getTakerDetailAndReadyQuiz({ params }) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("You have to login to take quiz.");

  const userDetail = fetch("http://127.0.0.1:8080/v1/api/user", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const quizDetail = fetch(
    `http://127.0.0.1:8080/v1/api/user/quiz/detail?_id=${params.qid}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  const [res1, res2] = await Promise.all([userDetail, quizDetail]);
  const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
  if (!data1.success) {
    throw new Error(data1.message);
  }
  if (!data2.success) {
    throw new Error(data2.message);
  }
  return data2;
}
