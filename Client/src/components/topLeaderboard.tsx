import "../pages/index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../assets/AuthContext";

interface Player {
  username: string;
  balance: number;
}
/**
 * Displays the top 5 players with the highest balance.
 * 
 * - Fetches user data from the database and combines it with local sample data.
 * - Retrieves the logged-in user's balance if authenticated.
 * - Ensures "the house" always has a balance at least 100 coins higher than the highest user balance.
 * - Sorts players in descending order and displays the top 5.
 */

function TopLeaderboard() {
  const [data, setData] = useState<Player[]>([]);
  const { loggedIn } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);

  const localPlayers: Player[] = [
    { username: "thehouse", balance: 1200 },
    { username: "HugoHustle", balance: 1200 },
    { username: "Tobbe Token", balance: 950 },
    { username: "Jacob Jackpot", balance: 720 },
    { username: "Erik Ersättning", balance: 650 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/game/users");

        if (!response.data || response.data.length === 0) {
          console.error("Ingen data hittades");
          setData([...localPlayers]);
          return;
        }

        const databasePlayers: Player[] = response.data.map(
          (player: Player) => ({
            username: player.username,
            balance: player.balance,
          })
        );

        setData([...databasePlayers, ...localPlayers]);
      } catch (error) {
        console.error("Fel vid hämtning av data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetches current users balance
    const fetchUserBalance = async () => {
      console.log("AAH ");
      if (!loggedIn) return;

      try {
        const response = await axios.post(
          "http://localhost:8080/game/balance/get"
        );
        if (response.data && response.data.balance != null) {
          setBalance(response.data.balance);
        }
      } catch (error) {
        console.error("Fel vid hämtning av användarens saldo:", error);
      }
    };

    fetchUserBalance();
  }, [loggedIn]);

  useEffect(() => {
    // Updates house balance to be 100 over
    const houseAlwaysWins = async () => {
      if (balance !== null) {
        setData((prevData) => {
          const houseBalance = Math.max(5000, balance + 100);

          return [
            ...prevData.filter((p) => p.username !== "the house"), // Takes away the old "the house"
            { username: "the house", balance: houseBalance }, // Adds the new uppdated "the house"
          ];
        });
      }
    };

    houseAlwaysWins();
  }, [balance]);

  const sortedPlayers = [...data].sort((a, b) => b.balance - a.balance);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Top 5 Gamers 🏆</h2>
      <ul className="leaderboard">
        {sortedPlayers.slice(0, 5).map(
          (
            player,
            index 
          ) => (
            <li key={index} className="leaderboard-item">
              <span className="rank">#{index + 1}</span>
              <span className="username">{player.username}</span>
              <span className="balance">{player.balance} coins</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default TopLeaderboard;
