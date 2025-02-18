import "../assets/styles.css";

function Navbar() {
  return (
    <nav className="col-12 d-flex justify-content-flex-start">
      <ul>
        <li className="navbar_links">
          <a href="#">Profile</a>
        </li>
        <li className="navbar_links">
          <a href="#">Casino Slots</a>
        </li>
        <li className="navbar_links">
          <a href="Game.html">Coin Flip</a>
        </li>
        <li className="navbar_links">
          <a href="Game.html">Game</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
