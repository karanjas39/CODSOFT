import "./Header.css";

import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="nav-bar">
      <h1>
        <img src="/website-icon.png" alt="Web site icon" />
        Blogify
      </h1>
      <div className="links">
        <a href="#">Contact Us</a>
        <Link to="login">
          <button>Login</button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
