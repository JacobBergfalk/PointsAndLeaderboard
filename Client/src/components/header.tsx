import QuotesRotator from "./QuoteRotator";
import Registration from "../pages/Registration";
import Login from "../pages/Login";

import "../assets/styles.css";
import "../assets/buttons.css";
import { useState } from "react";
import { useAuth } from "../assets/AuthContext";

import { Link } from "react-router-dom";

import axios from "axios";
axios.defaults.withCredentials = true;

/**
 * The website's main header, including navigation and user authentication controls.
 * 
 * - Displays the site logo with a link to the homepage.
 * - Rotates motivational quotes in the center.
 * - Shows profile button if the user is logged in.
 * - If not logged in, displays login and registration buttons.
 * - Opens login and registration modals when buttons are clicked.
 */

function Header() {
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { loggedIn } = useAuth();

  return (
    <header>
      <Link to={"/index"}>
        <img className="header-images" src="images/logo-temp.png" alt="logo" />
      </Link>

      <div className="quote-content">
        <QuotesRotator />
      </div>
      <div className="user-buttons">
        {loggedIn ? ( // Logged in
          <Link to={"/profile"}>
            <button className="profile-button">Profile</button>
          </Link>
        ) : (
          // Not Logged in
          <>
            <button className="login-button" onClick={() => setLoginOpen(true)}>
              Log In
            </button>
            <Login
              isOpen={loginOpen}
              onClose={() => setLoginOpen(false)}
              onOpenRegistration={() => setRegistrationOpen(true)}
              //onLoginSuccess={() => setLoggedIn(true)} // Pass callback
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
              //onRegisterSuccess={() => setLoggedIn(true)}
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
