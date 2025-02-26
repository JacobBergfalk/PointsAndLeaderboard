import { useState } from "react";
import "./registrationLogin.css";

interface modal {
  isOpen: boolean;
  onClose: () => void;
}

function notificationModal(param: modal) {
  if (!param.isOpen) return null;

  const [redBtn, setRedBtn] = useState(false);
  const [greenBtn, setGreenBtn] = useState(false);
  const [blueBtn, setBlueBtn] = useState(false);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="modal-overlay" onClick={param.onClose}>
      {/* Opacity */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={param.onClose}>
          &times;
        </button>

        <div className="group-buttons">
          <button
            className={`sort-btn red ${redBtn ? "pressed" : ""}`}
            onClick={() => setRedBtn(!redBtn)} /* Change to !pressed*/
          >
            red
          </button>
          <button
            className={`sort-btn green ${greenBtn ? "pressed" : ""}`}
            onClick={() => setGreenBtn(!greenBtn)} /* Change to !pressed*/
          >
            green
          </button>
          <button
            className={`sort-btn blue ${blueBtn ? "pressed" : ""}`}
            onClick={() => setBlueBtn(!blueBtn)} /* Change to !pressed*/
          >
            blue
          </button>
        </div>

        <div className="input-container">
          <label htmlFor="title">Titel</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Skriv titel här..."
          />
        </div>

        <div className="input-container">
          <label htmlFor="message">Meddelande</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Skriv meddelande här..."
          />
        </div>

        <button className="send-button">Skicka</button>
      </div>
    </div>
  );
}

export default notificationModal;
