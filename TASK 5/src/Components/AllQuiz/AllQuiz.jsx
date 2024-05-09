import { useLoaderData } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "../../Styles/allQuiz.scss";
import QuizCard from "./QuizCard";
import { backend_url } from "../../constant";

const links = [
  {
    text: "Contact us",
    to: "/contact",
  },
];
const btns = [
  {
    text: "Login",
    to: "/login",
  },
];

export default function AllQuiz() {
  const { quizes } = useLoaderData();

  return (
    <section className="all-quiz-main">
      <NavBar links={links} btns={btns} />
      <div>
        <h1>All Quizes</h1>
        <div>
          {quizes.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} />
          ))}
        </div>
      </div>
    </section>
  );
}

export async function getAllQuizesInMain() {
  const response = await fetch(`${backend_url}/v1/api/user/quiz/all/user`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  return data;
}
