import { useEffect, useState } from "react";
import "../pages/index.css";
import axios from "axios";
import { useAuth } from "../assets/AuthContext";

function topLeaderboard() {
  const { username, loggedIn } = useAuth();
  const [balance, setBalance] = useState<number>();

  const [players, setPlayers] = useState([
    // will be responsive in future
    { username: "HugoHustle", balance: 1200 },
    { username: "Tobbe Token", balance: 950 },
    { username: "Jacob Jackpot", balance: 720 },
    { username: "Erik Ersättning", balance: 650 },
  ]);

  useEffect(() => {
    const getBalance = async () => {
      if (!loggedIn) return;
      try {
        const response = await axios.get(
          "http://localhost:8080/game/balance/get"
        );

        if (username && response.data.balance != undefined) {
          setBalance(response.data.balance);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getBalance();
  }, [loggedIn]);

  useEffect(() => {
    if (balance !== undefined && username) {
      const houseBalance = Math.max(2000, balance + 100);

      setPlayers((prevPlayers) => [
        ...prevPlayers,
        { username, balance: balance },
        { username: "the house", balance: houseBalance },
      ]);
    }
  }, [balance]);

  // Sort players in descending order (highest balance first)
  const sortedPlayers = [...players]
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 5); // slice to only top 5

  return (
    <div className="leaderboard-container">
      <h2>🏆 Top 5 Gamers 🏆</h2>
      <ul className="leaderboard">
        {sortedPlayers.map((player, index) => (
          <li key={index} className="leaderboard-item">
            <span className="rank">#{index + 1}</span>
            <span className="username">{player.username}</span>
            <span className="balance">{player.balance} coins</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default topLeaderboard;
