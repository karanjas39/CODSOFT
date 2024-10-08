import "../../Styles/login.scss";

import Header from "../Header/Header";

import { Link, Form, useActionData, redirect } from "react-router-dom";

function Login() {
  const data = useActionData();

  return (
    <>
      <Header btnObj={{ path: "/register", text: "Register" }} />
      <section className="login">
        <h2>
          Login<span>.</span>
        </h2>
        <Form method="post" action="/login">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter email here..."
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password here..."
            />
          </div>
          <button>Submit</button>
          {data && data.message && <p>{data.message}</p>}
        </Form>
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

export async function handleLogin({ request }) {
  const req = await request.formData();
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const bodyData = {
    email: req.get("email"),
    password: req.get("password"),
  };

  if (!bodyData.password || !bodyData.email) {
    return { message: "All fields are mandatory." };
  }

  if (!emailRegex.test(bodyData.email)) {
    return { message: "Enter valid email address." };
  }

  try {
    const response = await fetch("http://127.0.0.1:8081/v1/api/user/login", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    if (data?.success == true) {
      sessionStorage.setItem("token", data.token);
      // return redirect(`/dashboard/${data.token}`);
      return redirect(`/dashboard/user`);
    }
    return { message: data.message };
  } catch (error) {
    return { message: "Unable to login now. Try again later." };
  }
}
