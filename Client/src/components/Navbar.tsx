import "../assets/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
/**
 * Navigation bar consisting of Home, Coin Flip and Game
 */
function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li className="navbar_links">
            <Link to="/index">Home</Link>
          </li>
          <li className="navbar_links">
            <Link to="/coinflip">Coin Flip</Link>
          </li>
          <li className="navbar_links">
            <Link to="/stockgrapf">stock</Link>
          </li>
        </ul>
      </nav>
      <div>
        <div className=" d-flex align-items-center justify-content-center">
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
