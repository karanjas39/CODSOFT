import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import formatDate from "../../Utils/formatDate";
import { MdEmail } from "react-icons/md";
import { FaCertificate, FaUser } from "react-icons/fa";
import "../../Styles/dashboard.scss";

const links = [
  {
    text: "Manage Account",
    to: "/",
  },
  { text: "Create Quiz", to: "/quiz/create" },
];

const btns = [
  {
    text: "Logout",
    to: "/",
  },
];

export default function DashboardCreator() {
  const { user } = useLoaderData();
  const [firstLetter, ...last] = user?.role?.split("");
  const [greeting, setGreeting] = useState("");
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
          <h2>Recently Created Quiz</h2>
          <div></div>
        </div>
      </div>
    </section>
  );
}

export async function getCreatorDetail() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized access.");
  }
  const response = await fetch("http://127.0.0.1:8080/v1/api/user", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }
  if (data.user.role != "creator") throw new Error("Unauthorized access.");
  return data;
}
