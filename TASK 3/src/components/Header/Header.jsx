import "../../Styles/header.scss";
import { Link } from "react-router-dom";

function Header({ btnObj, links = [] }) {
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h1>
          <img src="/website-icon.png" alt="Web site icon" />
          Blogify
        </h1>
      </Link>
      <div>
        <div
          className={`links ${btnObj?.cls == "home-btn" ? "home-links" : ""}`}
        >
          {links.length != 0
            ? links.map((el, i) => (
                <Link to={el.path} key={i}>
                  {el.text}
                </Link>
              ))
            : ""}
        </div>
        <Link to={btnObj.path}>
          <button className={btnObj?.cls == "home-btn" ? "home-btn" : ""}>
            {btnObj.text}
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
