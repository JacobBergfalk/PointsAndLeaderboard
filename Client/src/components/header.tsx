import QuotesRotator from "./QuoteRotator";
import Registration from "../pages/Registration";
import Login from "../pages/Login";

import "../assets/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

function Header() {
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check session status on load
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:8080/game/session");
        setLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/game/logout");
      setLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header>
      <img className="header-images" src="images/logo-temp.png" alt="logo" />
      <div className="quote-content">
        <QuotesRotator />
      </div>
      <div className="user-buttons">
        {loggedIn ? (
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          // Logged in or not
          <>
            <button className="login-button" onClick={() => setLoginOpen(true)}>
              Log In
            </button>
            <Login
              isOpen={loginOpen}
              onClose={() => setLoginOpen(false)}
              onOpenRegistration={() => setRegistrationOpen(true)}
              onLoginSuccess={() => setLoggedIn(true)} // Pass callback
            />
            <button
              className="registration-button"
              onClick={() => setRegistrationOpen(true)}
            >
              Register
            </button>
            <Registration
              isOpen={registrationOpen}
              onClose={() => setRegistrationOpen(false)}
              onOpenLogin={() => setLoginOpen(true)}
              onRegisterSuccess={() => setLoggedIn(true)}
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
