import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function coinflip() {
  const [imageSrc, setImageSrc] = useState("images/coin.png");
  const [balance, setBalance] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(10); // Standardinsats

  const [error, setError] = useState<string | null>(null);

  const handleFlip = async () => {
    try {
      const response = await axios.post("http://localhost:8080/game/coinflip", {
        choice: "Heads",
        betAmount: betAmount,
      });

      const { win, balance } = response.data;
      setBalance(balance);

      if (win) {
        setImageSrc("images/thumbsup.png"); // Vinst
      } else {
        setImageSrc("images/catlaughing.jpg"); // Förlust
      }

      setTimeout(() => {
        setImageSrc("images/coin.png"); // Återställ efter 5 sek
      }, 500);
    } catch (err) {
      setError("Ett fel uppstod vid anropp av server");
    }
  };

  return (
    <div className="container">
      <img className="game-images" src={imageSrc} alt="coin" />
      <p>Balance: {balance !== null ? `${balance} coins` : "Loading..."}</p>

      <div className="bet-container">
        <label>Bet Amount:</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
        />
      </div>

      <button className="btn btn-primary mt-3" onClick={handleFlip}>
        Vinn pengar knappen
      </button>
    </div>
  );
}

export default coinflip;
