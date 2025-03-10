import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles.css";
import "../assets/buttons.css";

import axios from "axios";
import { useAuth } from "../assets/AuthContext";
axios.defaults.withCredentials = true;

function coinflip() {
  const { loggedIn } = useAuth();

  const [imageSrc, setImageSrc] = useState("images/coin.png");
  const [balance, setBalance] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(10); // Standardinsats
  const [error, setError] = useState<string | null>(null);

  const handleFlip = async () => {
    try {
      if (!loggedIn) {
        setError("You must be logged in to play!");
        alert("Must be logged in");
        return;
      }

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
      setError("An error occurred while fetching data apa");
      console.error(error);
    }
  };

  useEffect(() => {
    // need to get fixed to account for a user not logged in
    const getBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/game/balance/get"
        ); //Skickar get till localhosten

        if (response.data.success) {
          const balance = response.data.balance;
          setBalance(balance);
        } else {
        }
      } catch (err) {
        setError("An error occurred while fetching data bitch");
        console.error(error);
      }
    };

    getBalance(); // typescript lmao
  });

  return (
    <div className="container">
      <img className="game-images" src={imageSrc} alt="coin" />

      <p className="bet-balance">
        Balance: {balance !== null ? `${balance} coins` : "Loading..."}
      </p>
      <div className="bet-container">
        <label>Bet Amount:</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
        />
      </div>
      <button className="" onClick={handleFlip}>
        Vinn pengar knappen
      </button>
      {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
    </div>
  );
}

export default coinflip;
