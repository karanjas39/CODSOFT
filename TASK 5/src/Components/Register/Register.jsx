import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Notification from "../Notification/Notification";
import { useNavigate } from "react-router-dom";
import "../../Styles/register.scss";

const links = [
  {
    text: "Contact Us",
    to: "/contact",
  },
];
const btns = [
  {
    text: "Login",
    to: "/login",
  },
];

export default function Login() {
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      return setMsg("All fields are mandatory.");
    }
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(email)) {
      return setMsg("Please enter a valid email address.");
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8080/v1/api/user/create", {
        method: "POST",
        body: JSON.stringify({ email, password, role, name }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error("You can not register at this moment.");
      }
      setMsg(data.message);
      setEmail("");
      setName("");
      setRole("");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setMsg(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="register">
        <NavBar links={links} btns={btns} />
        <form onSubmit={handleRegisterSubmit} className="register-form">
          <h2>
            Quizeo's <span>Register</span> Portal
          </h2>
          <div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your Full name here..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your email here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="role">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                id="role"
              >
                <option value="">Select your role</option>
                <option value="taker">Taker (If you want to take Quiz)</option>
                <option value="creator">
                  Creator (If you want to create Quiz)
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Your password here..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button>
              Register{" "}
              {loading && (
                <img className="loader" src="/loader.svg" alt="Loader Image" />
              )}
            </button>
          </div>
        </form>
      </section>
      {msg && <Notification msg={msg} setMsg={setMsg} />}
    </>
  );
}
