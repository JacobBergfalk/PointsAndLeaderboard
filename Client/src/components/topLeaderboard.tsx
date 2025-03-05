import "../pages/index.css";

function topLeaderboard() {
  //const { loggedIn, username } = useAuth();   // Növändigt för att bli korrigerade för listan
  const players = [
    // will be responsive in future
    { username: "HugoHustle", balance: 1200 },
    { username: "Tobbe Token", balance: 950 },
    { username: "the house", balance: 5000 },
    { username: "Jacob Jackpot", balance: 720 },
    { username: "Erik Ersättning", balance: 650 },
  ];

  // Sort players in descending order (highest balance first)
  const sortedPlayers = [...players].sort((a, b) => b.balance - a.balance);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Top 5 Gamers 🏆</h2>
      <ul className="leaderboard">
        {/*loggedIn && username && players.push({ username, balance }) FRAMTIDA, POTENTIELLT FUNGERAR*/}
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
