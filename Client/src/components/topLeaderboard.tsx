import "../pages/index.css";
import axios from "axios";
import { useEffect, useState } from "react";

interface Player {
  username: string;
  balance: number;
}

function TopLeaderboard() {
  const [data, setData] = useState<Player[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/game/users");

        if (!response.data || response.data.length === 0) {
          console.error("Ingen data hittades");
          return;
        }

        const playersNew: Player[] = response.data.map((player: Player) => ({
          username: player.username,
          balance: player.balance,
        }));

        setData(playersNew);
      } catch (error) {
        console.error("Fel vid hämtning av data:", error);
      }
    };

    fetchData();
  }, []); 

 
  const sortedPlayers = [...data].sort((a, b) => b.balance - a.balance);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Top 5 Gamers 🏆</h2>
      <ul className="leaderboard">
        {sortedPlayers.slice(0, 5).map((player, index) => ( //Den här raden kod är magi jag förstår absolut ingenting vad som händer här tänker inte ens låtsas
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

export default TopLeaderboard;
