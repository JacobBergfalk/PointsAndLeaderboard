import TopLeaderboard from "../components/topLeaderboard";
import SalesPitch from "../components/SalesPitch";

import "./index.css";

function index() {
  const games = [
    { title: "Sonic Frenzy", img: "images/coin.png" },
    { title: "Traffic Tom", img: "images/coin.png" },
    { title: "Capybara Clicker 2", img: "images/coin.png" },
    { title: "Blazing Knight", img: "images/coin.png" },
    { title: "Capybara Clicker", img: "images/coin.png" },
    { title: "Ragdoll Archers", img: "images/coin.png" },
    { title: "Draw Crash Race", img: "images/coin.png" },
    { title: "Helix Jump 2", img: "images/coin.png" },
    { title: "Hole.io", img: "images/coin.png" },
  ];

  const latestGames = [
    { title: "Sonic Frenzy", img: "images/coin.png" },
    { title: "Traffic Tom", img: "images/coin.png" },
    { title: "Capybara Clicker 2", img: "images/coin.png" },
    { title: "Blazing Knight", img: "images/coin.png" },
  ];

  return (
    <div className="container">
      <div className="top-container">
        <div className="latest-games">
          <h2>🔥 Hetaste spelen</h2>
          <div className="game-grid">
            {latestGames.map((game, index) => (
              <a key={index} className="game-card" href="https://stodlinjen.se">
                <img src={game.img} alt={game.title} className="game-image" />
                <p className="game-title">{game.title}</p>
              </a>
            ))}
          </div>
        </div>
        <div className="leaderboard-wrapper">
          <TopLeaderboard />
        </div>
      </div>

      <div className="game-gallery-container">
        <h2>🎮 Senaste spelen</h2>
        <div className="game-gallery">
          {games.map((game, index) => (
            <a key={index} className="game-card" href="https://stodlinjen.se">
              <img src={game.img} alt={game.title} className="game-image" />
              <p className="game-title">{game.title}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="sales-pitch-container">
        <SalesPitch></SalesPitch>
      </div>
    </div>
  );
}

export default index;
