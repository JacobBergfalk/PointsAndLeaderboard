import { useState } from "react";
import "./registrationLogin.css";
import axios from "axios";
import { useAuth } from "../assets/AuthContext";

axios.defaults.withCredentials = true;

interface modal {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

/**
 * Registration modal allows users to enter credentials to create an account
 *
 * - Includes validation for username and passwords.
 * - Requires the user to check "Gamble Time?" before registering.
 *
 * @param param - State and handlers for the modal
 * @returns The registration modal JSX if `isOpen` is true, otherwise `null`.
 */
function notificationModal(param: modal) {
  if (!param.isOpen) return null;

  const { register } = useAuth(); // use Register from authentication

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [gambleTime, setGambleTime] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  /**
   * Switches from registration modal to login modal.
   */
  const switchModal = () => {
    param.onClose();
    param.onOpenLogin();
  };

  /**
   * Handles user registration and validation before sending to the backend.
   *
   * - Requires a username and matching passwords.
   * - Ensures the "Gamble Time?" checkbox is checked.
   * - If registration is successful, the modal closes.
   * - If registration fails, an error message is displayed.
   *
   */
  const handleRegister = async () => {
    setErrorMessage(""); // reset when clicking button
    setErrorPassword("");

    if (!gambleTime) {
      setErrorMessage("Gamble time!");
      return;
    }

    if (!username) {
      setErrorMessage("Username is required");
      return;
    }

    if (!password || !rePassword) {
      setErrorPassword("Password is required!");
      return;
    }

    if (password !== rePassword) {
      setErrorPassword("Passwords does not match!");
      return;
    }

    setErrorMessage("");
    setErrorPassword("");

    const success = await register(username, password);
    if (success) {
      param.onClose(); //Close modal if success
    } else {
      setErrorMessage("Registrering misslyckades.");
    }
  };

  return (
    <div className="modal-overlay" onClick={param.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={param.onClose}>
          {/* X button */}
          &times;
        </button>

        <h2>Create User</h2>

        {errorMessage && (
          <p style={{ color: "red", fontSize: "12px" }}>{errorMessage}</p>
        )}
        {errorPassword && (
          <p style={{ color: "red", fontSize: "12px" }}>{errorPassword}</p>
        )}

        <div className="input-container">
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            style={{ borderColor: errorMessage && !username ? "red" : "" }}
          />
        </div>

        <div className="input-container">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            style={{ borderColor: errorPassword && !password ? "red" : "" }}
          />
        </div>

        <div className="input-container">
          <input
            id="password"
            type="password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder="Re-Type Password"
            style={{ borderColor: errorPassword ? "red" : "" }}
          />
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
          <button className="register-btn" onClick={handleRegister}>
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
