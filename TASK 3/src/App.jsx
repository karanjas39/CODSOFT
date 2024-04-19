import "./Styles/app.scss";
import Header from "./components/Header/Header";

const links = [{ text: "Contact Us", path: "/contact" }];

function App() {
  return (
    <>
      <Header btnObj={{ path: "/login", text: "Login" }} links={links} />
      <section className="app">
        <div className="top">
          <div>
            <p>
              Welcome to <span>Blogify</span> - Your Ultimate Destination for
              Insights and Inspiration!
            </p>
            <button>Explore Blogs</button>
          </div>
          <img src="/content.png" alt="Hero section gif" />
        </div>
      </section>
    </>
  );
}

export default App;
