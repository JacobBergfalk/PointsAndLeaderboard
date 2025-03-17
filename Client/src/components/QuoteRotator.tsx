import { useState, useEffect, act } from "react";
import "../assets/styles.css";

const quotes = [
  "99% of Gamblers Quit Before They Win Big - Erik Earner",
  "A Billion Zillion Gillion Dollars - Jacob Jackpot",
  "I Can Quit When I Want To - Hugo Hustle.",
  "You only need to win big once - Jean Paul",
];
/**
 * Rotates motivational quotes in the header
 */
function QuotesRotator() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      act(() => {
        setFade(false); // Start to fade-out
      });

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFade(true); // Fade-in
      }, 1000); // Wait for fade-out before switching
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`quote-container ${fade ? "fade-in" : "fade-out"}`}>
      <p>{quotes[index]}</p>
    </div>
  );
}

export default QuotesRotator;
