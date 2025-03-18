import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../assets/AuthContext";
import { Link } from "react-router-dom";
import "../assets/styles.css";

axios.defaults.withCredentials = true;

/**
 * Profile displays the users username and balance.
 *
 * - Allows the user to "Invest" to add credits.
 * - Provides a logout button that redirects to the home page.
 *
 */
function Profile() {
  const [balance, setBalance] = useState<number | null>(null);
  const { loggedIn, logout, username } = useAuth();

  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches and updates the user's balance from the backend.
   * If the user is not logged in, returns.
   *
   */
  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/game/balance/get"
        ); //Sends get to localhosten

        if (response.data.success) {
          const balance = response.data.balance;
          setBalance(balance);
        }
      } catch (err) {
        setError("An error occurred while fetching balance");
        console.error(error);
      }
    };

    if (!loggedIn) return;
    getBalance();
  });

  /**
   * Adds 100 coins to the user's balance.
   *
   * - Sends a request to the backend to add credits.
   * - If successful, updates the balance
   * - If failed, displays an error message.
   *
   */
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
      {/* Does not lead anywhere at the moment. Meant to be able to delete an account */}
      <p>Delete account</p>
    </div>
  );
}

export default Profile;
