import { useState, useEffect } from 'react';
//import axios from 'axios';
import fetchData from './getBalanceMethod';

const displayCredits = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const result = await fetchData();
          setData(result);
        } catch (err) {
          setError('An error occurred while fetching data');
        }
      };
      loadData();
    }, []);
  
    return (
      <div>
        {error && <p>{error}</p>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    );
  };

  export default displayCredits