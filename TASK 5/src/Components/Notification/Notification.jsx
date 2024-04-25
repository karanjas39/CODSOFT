import React, { useState, useEffect } from "react";
import "../../Styles/notification.scss";

function Notification({ msg, setMsg }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      setMsg("");
    }, 5000);
  }, []);

  return (
    <>
      {show && (
        <div className="notification">
          <span className="message">{msg}</span>
          <div className="line"></div>
        </div>
      )}
    </>
  );
}

export default Notification;
