import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/game/balance'); //Skickar get till localhosten
      setData(response.data); 
    } catch (err) {
      setError('An error occurred while fetching data'); 
      console.error(err);
    }
  };
  //Använde en knapp bara för att testa här. 
  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button> 
      {error && <p>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default App;
