import "./Header.css";

function Header({ setIsPopUp }) {
  return (
    <nav className="navbar">
      <div>
        <h2>Task Tracker</h2>
        <img src="/task.gif" alt="Icon" />
      </div>
      <button onClick={() => setIsPopUp(true)}>Change name</button>
    </nav>
  );
}

export default Header;
