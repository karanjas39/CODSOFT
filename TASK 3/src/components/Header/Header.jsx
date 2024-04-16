import "./Header.css";

function Header() {
  return (
    <nav className="nav-bar">
      <h1>
        <img src="/website-icon.png" alt="Web site icon" />
        Blogify
      </h1>
      <div className="links">
        <a href="#">Contact Us</a>
        <button>Login</button>
      </div>
    </nav>
  );
}

export default Header;
