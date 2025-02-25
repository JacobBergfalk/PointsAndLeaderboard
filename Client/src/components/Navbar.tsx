import React from "react";
import "../assets/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
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
      <div className="row">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <img
              className="header-images"
              src="images/raid-header.png"
              alt="banner-ad"
            />
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
