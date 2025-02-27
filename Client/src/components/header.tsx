import QuotesRotator from "./QuoteRotator";
import Registration from "../pages/Registration";
import Login from "../pages/Login";

import "../assets/styles.css";
import { useState } from "react";

function Header() {
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header>
      <img className="header-images" src="images/logo-temp.png" alt="logo" />
      <div className="quote-content">
        <QuotesRotator />
      </div>
      <div className="user-buttons">
        <button className="login-button" onClick={() => setLoginOpen(true)}>
          Log In
        </button>
        <Login
          isOpen={loginOpen}
          onClose={() => setLoginOpen(false)}
          onOpenRegistration={() => setRegistrationOpen(true)}
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
        />
      </div>
    </header>
  );
}

export default Header;
