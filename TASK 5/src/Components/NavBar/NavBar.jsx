import { Link } from "react-router-dom";
import "../../Styles/navBar.scss";

function NavBar({ links = [], btns = [] }) {
  return (
    <nav>
      <Link to="/">
        <h2>Quizeo</h2>
      </Link>
      <div>
        {links &&
          links.map((link, i) => (
            <Link to={link.to} key={i}>
              {link.text}
            </Link>
          ))}
        {btns &&
          btns.map((btn, i) => (
            <Link to={btn.to} key={i}>
              <button>{btn.text}</button>
            </Link>
          ))}
      </div>
    </nav>
  );
}

export default NavBar;
