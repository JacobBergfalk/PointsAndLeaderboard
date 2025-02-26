import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/game/balance"); //Skickar get till localhosten
      const balance = response.data.balance;
      setData(balance);
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error(err);
    }
  };
  //Använde en knapp bara för att testa här.
  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {error && <p>{error}</p>}
      {data && <pre>{"balance: " + data}</pre>}
    </div>
  );
};

export default App;
