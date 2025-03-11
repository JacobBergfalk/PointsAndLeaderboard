import "../pages/index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../assets/AuthContext";

interface Player {
  username: string;
  balance: number;
}

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
            ...prevData.filter((p) => p.username !== "the house"), // Ta bort gammal "the house"
            { username: "the house", balance: houseBalance }, // Lägg till uppdaterad "the house"
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
            index //Den här raden kod är magi jag förstår absolut ingenting vad som händer här tänker inte ens låtsas
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
