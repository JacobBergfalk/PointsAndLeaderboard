import { useState } from "react";
import "./registrationLogin.css";

interface modal {
  isOpen: boolean;
  onClose: () => void;
}

function notificationModal(param: modal) {
  if (!param.isOpen) return null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="modal-overlay" onClick={param.onClose}>
      {/* Opacity */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={param.onClose}>
          &times;
        </button>

        <div className="input-container">
          <label htmlFor="Username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </div>

        <div className="input-container">
          <label htmlFor="Password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>

        <button className="send-button">Skicka</button>
      </div>
    </div>
  );
}

export default notificationModal;
