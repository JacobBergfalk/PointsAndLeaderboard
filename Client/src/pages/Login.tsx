import { useState } from "react";
import "./registrationLogin.css";
import axios from "axios";

axios.defaults.withCredentials = true;

interface modal {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegistration: () => void;
  onLoginSuccess: () => void;
}

function notificationModal(param: modal) {
  if (!param.isOpen) return null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const switchModal = () => {
    param.onClose();
    param.onOpenRegistration();
  };

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:8080/game/login", {
        username,
        password,
      });

      const { success, message } = response.data;

      if (success) {
        param.onClose();
        param.onLoginSuccess();
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

        <h2>Login</h2>

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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div>
          <button className="login-btn" onClick={loginUser}>
            Login
          </button>
          <p className="switch-modal-text" onClick={switchModal}>
            Dont have an account?
          </p>
        </div>
      </div>
    </div>
  );
}

export default notificationModal;
