import { useState } from "react";
import "./registrationLogin.css";
import axios from "axios";
import { useAuth } from "../assets/AuthContext";

axios.defaults.withCredentials = true;

interface modal {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegistration: () => void;
}

function LoginModal(param: modal) {
  if (!param.isOpen) return null;

  const { login } = useAuth(); // Hämta login-funktionen

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const switchModal = () => {
    param.onClose();
    param.onOpenRegistration();
  };

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      param.onClose(); // Stäng modalen om inloggning lyckas
    } else {
      setErrorMessage("Fel användarnamn eller lösenord!");
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>

        <div>
          <button className="login-btn" onClick={handleLogin}>
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

export default LoginModal;
