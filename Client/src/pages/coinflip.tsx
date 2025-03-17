import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles.css";
import "../assets/buttons.css";

import axios from "axios";
import { useAuth } from "../assets/AuthContext";
axios.defaults.withCredentials = true;

/**
 * A simple coin flip game where users can bet coins
 * 
 * Requires the user to be logged in
 * Sends a request to the backend to flip a coin with the chosen bet amount.
 * Updates the balance based on the outcome (win or loss).
 * Displays different images for win or loss and resets after 0.5 seconds.
 * Gets and displays the user's balance
 */

function coinflip() {
  const { loggedIn } = useAuth();

  const [imageSrc, setImageSrc] = useState("images/coin.png");
  const [balance, setBalance] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(10); 
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
        setImageSrc("images/thumbsup.png"); // Win
      } else {
        setImageSrc("images/catlaughing.jpg"); // Lost
      }

      setTimeout(() => {
        setImageSrc("images/coin.png"); // Reset after 0.5 sec
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
        ); //Sends get to localhosten

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
