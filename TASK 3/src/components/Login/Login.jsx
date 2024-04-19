import { useState } from "react";
import "../../Styles/login.scss";

import Header from "../Header/Header";

import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8080/v1/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      setMessage(data.message);
      if (data?.success == true) {
        sessionStorage.setItem("token", data.token);
      }
    } catch (error) {
      setMessage("Unable to login now. Try again later.");
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }

  return (
    <>
      <Header btnObj={{ path: "/register", text: "Register" }} />

      <section className="login">
        <h2>
          Login<span>.</span>
        </h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email here..."
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password here..."
            />
          </div>
          <button>Submit</button>
          {message && <p>{message}</p>}
        </form>
        <div>
          Are you a new user?
          <Link to="/register">
            <p>Register here</p>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Login;
