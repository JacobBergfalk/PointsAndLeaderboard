import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

function Profile() {
  const [username, setUsername] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // session user
        const sessionResponse = await axios.get(
          "http://localhost:8080/game/session"
        );

        if (sessionResponse.data.loggedIn) {
          setUsername(sessionResponse.data.username);
        }

        // user balance
        const balanceResponse = await axios.get(
          "http://localhost:8080/game/balance/get"
        );
        setBalance(balanceResponse.data.balance);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  });

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
      {username ? <h3>Welcome, {username}!</h3> : <p>Loading...</p>}
      <p>Balance: {balance !== null ? `${balance} coins` : "Loading..."}</p>

      <button className="" onClick={invest}>
        Invest
      </button>
    </div>
  );
}

export default Profile;
