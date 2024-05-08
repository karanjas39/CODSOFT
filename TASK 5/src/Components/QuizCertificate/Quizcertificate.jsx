import { useLoaderData } from "react-router-dom";
import Confetti from "react-confetti";
import "../../Styles/certificate.scss";
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";

const links = [
  {
    to: "/contact",
    text: "Contact Us",
  },
  {
    to: "/dashboard/taker",
    text: "Dashboard",
  },
];

export default function Quizcertificate() {
  const {
    data: { quiz },
    cid,
  } = useLoaderData();
  const [isConfetti, setIsConfetti] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsConfetti(false);
    }, 6000);
  }, []);
  return (
    <>
      <NavBar links={links} />
      {isConfetti && <Confetti />}
      <div className="certificate">
        <div className="web-cert">
          <h1>Quizeo</h1>
          <div>
            <p>Certificate No: {cid}</p>
            <p>
              Certificate url:{" "}
              <a
                href={`localhost:5173/quiz/certificate/${cid}`}
              >{`localhost:5173/quiz/certificate/${cid}`}</a>
            </p>
          </div>
        </div>
        <div className="cert-detail">
          <h2>Certificate of Achievement</h2>
          <p>
            This is to certify that <span>{quiz.takenBy.name}</span> has
            successfully completed <span>'{quiz.title}'</span> quiz created by{" "}
            <span>{quiz.createdBy.name}</span> with an overall score of{" "}
            <span>
              {quiz.score.reduce((acc, cur) => acc + cur, 0) / quiz.attempt}/
              {quiz.total}
            </span>{" "}
            in <span>{quiz.attempt}</span> attempts.
          </p>
        </div>
        <div className="present">
          <p>Presented by</p>
          <p>Jaskaran Singh</p>
          <p>(Creator of Quizeo)</p>
        </div>
      </div>
    </>
  );
}

export async function getQuizCertificate({ params }) {
  const response = await fetch(
    `http://127.0.0.1:8080/v1/api/user/quiz/take/info?_id=${params.cid}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  return { data: data, cid: params.cid };
}
