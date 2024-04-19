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
        <div className="links">
          {links.length != 0
            ? links.map((el) => <Link to={el.path}>{el.text}</Link>)
            : ""}
        </div>
        <Link to={btnObj.path}>
          <button>{btnObj.text}</button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
