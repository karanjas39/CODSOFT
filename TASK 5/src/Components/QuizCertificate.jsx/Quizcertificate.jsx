import { useLoaderData } from "react-router-dom";

export default function Quizcertificate() {
  const { quiz } = useLoaderData();
  console.log(quiz);

  return <div>Quizcertificate</div>;
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
  return data;
}
