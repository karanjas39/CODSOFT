import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Notification from "../Notification/Notification";
import { useNavigate } from "react-router-dom";
import "../../Styles/login.scss";
import { backend_url } from "../../constant";

const links = [
  {
    text: "Contact Us",
    to: "/contact",
  },
];
const btns = [
  {
    text: "Register",
    to: "/register",
  },
];

export default function Login() {
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLoginSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return setMsg("All fields are mandatory.");
    }
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(email)) {
      return setMsg("Please enter a valid email address.");
    }

    setLoading(true);
    try {
      const response = await fetch(`${backend_url}/v1/api/user/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      sessionStorage.setItem("token", data.token);
      setMsg(data.message);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        if (data.role == "creator") {
          navigate("/dashboard/creator");
        } else if (data.role == "taker") {
          navigate("/dashboard/taker");
        }
      }, 2000);
    } catch (error) {
      setMsg(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="login">
        <NavBar links={links} btns={btns} />
        <form onSubmit={handleLoginSubmit} className="login-form">
          <h2>
            Quizeo's <span>Login</span> Portal
          </h2>
          <div>
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Your password here..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p>Forget Password?</p>
            <button>
              Submit{" "}
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
