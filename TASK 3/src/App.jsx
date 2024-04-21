import { Link } from "react-router-dom";
import "./Styles/app.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const links = [{ text: "Explore Blogs", path: "/blogs" }];

function App() {
  return (
    <>
      <Header
        btnObj={{ path: "login", text: "Login", cls: "home-btn" }}
        links={links}
      />
      <section className="app">
        <div className="top">
          <div>
            <p>
              Welcome to <span>Blogify</span> - Your Ultimate Destination for
              Insights and Inspiration!
            </p>
            <Link to="/blogs">
              <button>Explore Blogs</button>
            </Link>
          </div>
          <img src="/content.png" alt="Hero section gif" />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
