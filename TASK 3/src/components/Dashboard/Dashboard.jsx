import "../../Styles/dashboard.scss";
import { useLoaderData, redirect } from "react-router-dom";

function Dashboard() {
  const data = useLoaderData();
  console.log(data);
  return <section className="dashboard">Dashboard</section>;
}

export default Dashboard;

export const getDetails = async ({ params }) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch("http://127.0.0.1:8080/v1/api/user/details", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data?.user || null;
};
