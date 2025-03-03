import { useState } from "react";
import "./registrationLogin.css";
import axios from "axios";

axios.defaults.withCredentials = true;

interface modal {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  onRegisterSuccess: () => void;
}

function notificationModal(param: modal) {
  if (!param.isOpen) return null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [gambleTime, setGambleTime] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const switchModal = () => {
    param.onClose();
    param.onOpenLogin();
  };

  const registerUser = async () => {
    if (password !== rePassword) {
      setErrorMessage("Passwords does not match");
      return;
    }

    setErrorMessage(""); // resets if passwords match

    try {
      const response = await axios.post("http://localhost:8080/game/register", {
        username,
        password,
      });

      const { success, message } = response.data;

      if (success) {
        param.onClose();
        param.onRegisterSuccess();
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("error", error);
      alert("There was an error when registrating");
    }
  };

  return (
    <div className="modal-overlay" onClick={param.onClose}>
      {/* Opacity */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={param.onClose}>
          &times;
        </button>

        <h2>Create User</h2>
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

        <div className="input-container">
          <label htmlFor="Password">Re-Type Password</label>
          <input
            id="password"
            type="password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="Re-Type Password"
            style={{ borderColor: errorMessage ? "red" : "" }}
          />
          {errorMessage && (
            <p style={{ color: "red", fontSize: "12px" }}>{errorMessage}</p>
          )}
        </div>

        {/* CHECK IF PASSWORDS MATCH OR NOT*/}

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="checkbox"
            checked={gambleTime}
            onChange={(e) => setGambleTime(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="gambleTime">Gamble Time?</label>
        </div>

        <div>
          <button className="register-btn" onClick={registerUser}>
            Register
          </button>
          <p className="switch-modal-text" onClick={switchModal}>
            Already have an account?
          </p>
        </div>
      </div>
    </div>
  );
}

export default notificationModal;
