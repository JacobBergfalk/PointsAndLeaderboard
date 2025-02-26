import QuotesRotator from "./QuoteRotator";
import "../assets/styles.css";

function Header() {
  return (
    <header>
      <img className="header-images" src="images/logo-temp.png" alt="logo" />
      <div className="quote-content">
        <QuotesRotator />
      </div>
    </header>
  );
}

export default Header;
