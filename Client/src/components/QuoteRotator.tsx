import { useState, useEffect, act } from "react";
import "../assets/styles.css"; // Se till att CSS-filen innehåller fade-animationen

const quotes = [
  "99% of Gamblers Quit Before They Win Big - Erik Earner",
  "A Billion Zillion Gillion Dollars - Jacob Jackpot",
  "I Can Quit When I Want To - Hugo Hustle.",
  "You only need to win big once - Jean Paul",
];

function QuotesRotator() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      act(() => {
        setFade(false); // Börja fade-out
      });

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFade(true); // Fade-in
      }, 1000); // Vänta på fade-out innan byte
    }, 5000); // 5 sekunder

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`quote-container ${fade ? "fade-in" : "fade-out"}`}>
      <p>{quotes[index]}</p>
    </div>
  );
}

export default QuotesRotator;
