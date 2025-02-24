import React from "react";
import "../assets/styles.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="wd-flex justify-content-flex-start">
      <ul>
        <li className="navbar_links">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="navbar_links">
          <Link to="/casino">Casino Slots</Link>
        </li>
        <li className="navbar_links">
          <Link to="/coinflip">Coin Flip</Link>
        </li>
        <li className="navbar_links">
          <Link to="/game">Game</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
