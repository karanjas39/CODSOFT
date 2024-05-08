import "../../Styles/popup.scss";

export default function PopUp({ ques, setAns }) {
  function handleBtnClick(value) {
    setAns(value);
  }

  return (
    <div className="popup-outer">
      <div className="popup-container">
        <p>{ques}</p>
        <div>
          <button onClick={() => handleBtnClick(true)}>Yes</button>
          <button onClick={() => handleBtnClick(false)}>No</button>
        </div>
      </div>
    </div>
  );
}
