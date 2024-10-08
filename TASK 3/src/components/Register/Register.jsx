import { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/register.scss";

import Header from "../Header/Header";
import { backend_url } from "../../constants";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${backend_url}/v1/api/user/create`, {
        method: "POST",
        body: JSON.stringify({ email, password, name, username }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setEmail("");
        setName("");
        setPassword("");
        setUsername("");
      }
      setMessage(data.message);
    } catch (error) {
      setMessage("Unable to register now. Try again later.");
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }

  return (
    <>
      <Header btnObj={{ path: "/login", text: "Login" }} />
      <section className="register">
        <h2>
          Register<span>.</span>
        </h2>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name here..."
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username here..."
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
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
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Register;
