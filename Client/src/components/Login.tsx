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

/**
 *  Login modal where users can enter credentials and call
 *  authentication to try to log in
 *
 * - If login is successful, the modal closes.
 * - If login fails, an error message is displayed.
 *
 * @param param - state and handlers for the modal
 * @returns The login modal JSX if `isOpen` is true, otherwise `null`.
 */
function LoginModal(param: modal) {
  if (!param.isOpen) return null;

  const { login } = useAuth(); // Use Login auth.

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Switches from login modal to registration modal.
   */
  const switchModal = () => {
    param.onClose();
    param.onOpenRegistration();
  };

  /**
   * Handles login process.
   *
   * - Sends username and password to the authentication.
   * - If login is successful, the modal closes.
   * - If login fails, an error message is shown.
   */
  const handleLogin = async () => {
    setErrorMessage("");
    try {
      const success = await login(username, password);
      if (success) {
        param.onClose(); // Close modal if success
      } else {
        setErrorMessage("Fel användarnamn eller lösenord!");
      }
    } catch (err) {
      console.error(errorMessage);
    }
  };

  return (
    <div className="modal-overlay" onClick={param.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={param.onClose}>
          {/* X button */}
          &times;
        </button>

        <h2>Login</h2>

        {errorMessage && (
          <p style={{ color: "red", fontSize: "12px" }}>{errorMessage}</p>
        )}

        <div className="input-container">
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        <div className="input-container">
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
