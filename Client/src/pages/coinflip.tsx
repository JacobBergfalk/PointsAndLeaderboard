import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.withCredentials = true;

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
        setImageSrc("images/coin.png"); // Återställ efter 0.5 sek
      }, 500);
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error(error);
    }
  };

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get("http://localhost:8080/game/balance"); //Skickar get till localhosten
        const balance = response.data.balance;
        setBalance(balance);
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error(error);
      }
    };

    getBalance(); // typescript lmao
  });

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
      {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
    </div>
  );
}

export default coinflip;
