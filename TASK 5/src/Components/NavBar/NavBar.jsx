import { Link } from "react-router-dom";
import "../../Styles/navBar.scss";

function NavBar({ links = [], btns = [] }) {
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
      <div>
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
