import QuotesRotator from "./QuoteRotator";
import "../assets/styles.css";

function Header() {
  return (
    <header className="col-12">
      <img className="header-images" src="images/logo-temp.png" alt="logo" />
      <div className="quote-content">
        <QuotesRotator />
      </div>
    </header>
  );
}

export default Header;
