import { Link } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import "./Styles/app.scss";
import Footer from "./Components/Footer/Footer";

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

function App() {
  return (
    <>
      <NavBar links={links} btns={btns} />
      <section className="app">
        <div>
          <h2>
            Welcome to <span>Quizeo</span>
          </h2>
          <p>
            Become <span>creator</span> to create quiz or <span>taker</span> to
            take quiz.
          </p>
          <Link to="/quiz/all">
            <button>Start now</button>
          </Link>
        </div>
        <img src="/reading.png" alt="Reading image" />

        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>
      <Footer />
    </>
  );
}

export default App;
