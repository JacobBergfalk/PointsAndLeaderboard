import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../assets/AuthContext";
import { Link } from "react-router-dom";
import "../assets/styles.css";

axios.defaults.withCredentials = true;

function Profile() {
  const [balance, setBalance] = useState<number | null>(null);
  const { loggedIn, logout, username } = useAuth();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        if (!loggedIn) return;
        // user balance
        const balanceResponse = await axios.get(
          "http://localhost:8080/game/balance/get"
        );
        setBalance(balanceResponse.data.balance);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserBalance();
  }, [loggedIn]);

  const invest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/game/balance/add",
        {
          amount: 100,
        }
      );

      if (response.data.success) {
        setBalance(response.data.balance);
      } else {
        setError("Failed to add credits");
      }
    } catch (err) {
      setError("An error occurred while adding credits");
      console.error(error);
    }
  };

  return (
    <div className="container">
      {loggedIn ? <h3>Welcome, {username}!</h3> : <p>Loading...</p>}
      <p>Username: {username !== null ? `${username}` : "Loading..."}</p>
      <p>Balance: {balance !== null ? `${balance} coins` : "Loading..."}</p>
      <div className="profile-buttons">
        <button className="invest-button" onClick={invest}>
          Invest
        </button>
        <Link to="/index">
          <button className="logout-button" onClick={logout}>
            Log Out
          </button>
        </Link>
      </div>

      <p className="">Delete account</p>
    </div>
  );
}

export default Profile;
