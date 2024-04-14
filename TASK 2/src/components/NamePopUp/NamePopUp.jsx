import { useState } from "react";
import "./NamePopUp.css";

export default function NamePopUp({ setIsPopUp, setName }) {
  const [nameField, setNameField] = useState("");

  function handleNameSubmit(e) {
    e.preventDefault();
    if (!nameField) return;
    localStorage.setItem("task-tarcker-name", nameField);
    setName(nameField);
    setNameField("");
    setIsPopUp(false);
  }

  return (
    <>
      <div className="blur"></div>
      <form className="namePopUp" onSubmit={handleNameSubmit}>
        <label htmlFor="name">How may i call you?</label>
        <input
          type="text"
          id="name"
          value={nameField}
          onChange={(e) => setNameField(e.target.value)}
          placeholder="Enter your name...."
        />

        <button>Submit</button>
      </form>
    </>
  );
}
