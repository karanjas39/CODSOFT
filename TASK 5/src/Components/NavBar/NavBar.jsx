import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import "../../Styles/navBar.scss";
import { useState } from "react";

function NavBar({ links = [], btns = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  function handleBtnClick(e) {
    if (e.target.textContent == "Logout") {
      sessionStorage.removeItem("token");
    }
  }

  return (
    <nav>
      <Link to="/">
        <h2>Quizeo</h2>
      </Link>
      <p className="nav-btn" onClick={() => setIsOpen(true)}>
        <TiThMenu />
      </p>
      <div className={isOpen ? "links open" : "links"}>
        <button className="cancel-btn" onClick={() => setIsOpen(false)}>
          Close
        </button>
        {links &&
          links.map((link, i) =>
            (sessionStorage.getItem("token") && link.text === "Dashboard") ||
            link.text !== "Dashboard" ? (
              <Link to={link.to} key={i}>
                {link.text}
              </Link>
            ) : null
          )}

        {btns &&
          btns.map((btn, i) => (
            <Link to={btn.to} key={i}>
              <button onClick={(e) => handleBtnClick(e)}>{btn.text}</button>
            </Link>
          ))}
      </div>
    </nav>
  );
}

export default NavBar;
